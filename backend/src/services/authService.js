const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto= require('crypto')

const User = require('../models/userModel')
const imagesService = require('./imagesService')
const AppError = require('../utils/AppError')
const EmailVerification = require('../models/emailVerificationModel')
const { expirationMinutes } = require('../config/config')
const emailService = require('../services/emailService')

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

async function signup({ username, email, password, profileImageBuffer }) {
        await User.validateSignup({username, email, password})

        const userExists = await User.findOne({email})
        if (userExists) {
                if (userExists.email_verified) throw new AppError('Email already taken', 400)

                const {password_hash, ...safeUser} = userExists.toObject()

                await sendVerificationEmail(userExists)

                return {user: safeUser}
        }


        let profileImageUrl = null
        if (profileImageBuffer) {
                profileImageUrl = await imagesService.uploadImage(profileImageBuffer)
        }
        
        const usernameTaken = await User.findOne({username})
        if (usernameTaken) throw new AppError('Username already taken', 400)

        const user = await User.signup({username, email, password, profileImageUrl})
        const {password_hash, ...safeUser} = user.toObject()

        await sendVerificationEmail(user) // TODO check if email is sent succesfully

        return {user: safeUser}// TODO if user is not yet verified, frontend redirects to the verify email page
}

async function verifyEmail(verificationToken) {
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')
        const emailVerification = await EmailVerification.findOne({token_hash: hashedToken})
        if (!emailVerification) throw new AppError('Invalid verification token', 400)
        const user = await User.findById(emailVerification.user_id)
        if (!user) throw new AppError('Failed to find user')

        
        if (emailVerification.expires_at < new Date()) throw new AppError('Verification token has expired', 400)
        
        const userVerified = await User.findByIdAndUpdate(user._id, {email_verified: true}, {returnDocument: 'after', runValidators: true})

        await EmailVerification.findByIdAndDelete(emailVerification._id)

        const token = createToken(user._id, userVerified.email_verified)

        const {password_hash, ...safeUser} = userVerified.toObject()

        return {user: safeUser, token}
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
        sendVerificationEmail
}