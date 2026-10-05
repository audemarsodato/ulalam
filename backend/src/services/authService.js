const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto= require('crypto')
const { OAuth2Client } = require('google-auth-library')

const googleClient = new OAuth2Client()

const User = require('../models/userModel')
const EmailVerification = require('../models/emailVerificationModel')

const imagesService = require('./imagesService')
const emailService = require('./emailService')

const AppError = require('../utils/AppError')
const { expirationMinutes } = require('../config/config')

function createToken(_id, email_verified) {
        return jwt.sign({_id, email_verified}, process.env.JWT_SECRET)
}

function generateVerificationToken() {
        const verificationToken = crypto.randomBytes(32).toString('hex')
        const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex')

        return {verificationToken, verificationTokenHash}
}

async function sendVerificationEmail(user) {
        const { verificationToken, verificationTokenHash } = generateVerificationToken()
        const tokenExpiration = new Date(Date.now() + expirationMinutes * 60 * 1000)
        const emailVerification = await EmailVerification.create({
                user_id: user._id, 
                email: user.email,
                token_hash: verificationTokenHash,
                expires_at: tokenExpiration
        })

        await emailService.sendVerificationEmail({user, token: verificationToken, frontendUrl: process.env.FRONTEND_URL}) // TODO add prompt if email is not sent, email address of the user may be spelled wrong check you email address
}

async function continueWithGoogle(credential) {
        /*
        *  get google account payload
        *  check if email/user already exists
        *  if exists, 
        *       set email_verified to true
        *       if profile_image_url is null set it to the google accounts picture
        *       set googlee_id
        * if does not exists,
        *       create the account
        *       set email_verified to true
        *       profile_image_url to the google accounts picture
        * create jwt token
        * sanitize user details removing the password_hash
        * return safeUser and token
        */

        const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID
        })

        const {
                sub: google_id,
                email,
                name,
                email_verified,
                picture,
        } = ticket.getPayload()

        let user = null

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const userExists = await User.findOne({email})
        if (userExists) {
                user = await User.findOneAndUpdate({_id: userExists._id}, {
                        email_verified,
                        google_id
                }, options)

                if (!userExists.profile_image_url) user = await User.findOneAndUpdate({_id: userExists._id}, {
                        profile_image_url: picture
                }, options)
        }

        if (!userExists) {
                const username = name.replace(' ', '').trim().toLowerCase()

                user = await User.create({
                        google_id,
                        username,
                        email_verified,
                        email,
                        profile_image_url: picture
                })
        }

        const token = createToken(user._id, user.email_verified)
        const { password_hash, google_id: googleId, ...safeUser } = user.toObject()

        return {user: safeUser, token}
}

async function signup({ username, email, password }) {
        await User.validateSignup({username, email, password})

        // Checks if username contains space
        if (username && /\s/.test(username)) throw new AppError('Username must not contain space', 400)

        const userExists = await User.findOne({email})
        if (userExists) {
                if (userExists.email_verified) throw new AppError('Email already taken', 400)

                const {password_hash, ...safeUser} = userExists.toObject()

                await sendVerificationEmail(userExists)

                return {user: safeUser}
        }
        
        const usernameTaken = await User.findOne({username})
        if (usernameTaken) throw new AppError('Username already taken', 400)

        const user = await User.signup({username, email, password })
        const {password_hash, ...safeUser} = user.toObject()

        await sendVerificationEmail(user)

        /*
        *  if user is not yet verified, frontend redirects to the verify email page
        */
        return {user: safeUser} 
}

async function verifyEmail(verificationToken) {
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

        const emailVerification = await EmailVerification.findOne({token_hash: hashedToken})
        if (!emailVerification) throw new AppError('Invalid verification token', 400)
                
        if (emailVerification.expires_at < new Date()) throw new AppError('Verification token has expired', 400)
                        
        const updatedUser = await User.findByIdAndUpdate(
                emailVerification.user_id, 
                {email_verified: true}, 
                {returnDocument: 'after', runValidators: true}
        ).select('-password_hash')
        if (!updatedUser) throw new AppError('Failed to find user') // TODO app error must return a status code error

        await EmailVerification.findByIdAndDelete(emailVerification._id)

        const token = createToken(updatedUser._id, updatedUser.email_verified)

        return {user: updatedUser, token}
}

async function login({ email, password }) {
        const user = await User.login({email, password})

        if (!user.email_verified) {
                await sendVerificationEmail(user)

                throw new AppError('Email not yet verified. Verification email has been sent', 403, 'EMAIL_NOT_VERIFIED', {
                        email: user.email
                })
        }

        const {password_hash, ...safeUser} = user.toObject()        

        const token = createToken(user._id, user.email_verified)

        return {token, user: safeUser}
}

function authenticate(authorization) {
        try {
                const token = authorization.split(' ')[1]
                const { _id, email_verified } = jwt.verify(token, process.env.JWT_SECRET)

                if (!email_verified) throw new AppError('Email not yet verified', 400)

                // if (!mongoose.Types.ObjectId.isValid(_id)) throw new AppError('Invalid id from token', 400)

                return _id
        }
        catch (error) {
               throw error
        }
}

module.exports = {
        signup,
        login,
        authenticate,
        verifyEmail,
        sendVerificationEmail,
        continueWithGoogle
}