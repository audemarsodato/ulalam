const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto= require('crypto')

const User = require('../models/userModel')
const imagesService = require('./imagesService')
const AppError = require('../utils/AppError')
const EmailVerification = require('../models/emailVerificationModel')
const { expirationMinutes } = require('../config/config')
const emailService = require('../services/emailService')

function createToken(_id) {
        return jwt.sign({_id}, process.env.JWT_SECRET)
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

        await emailService.sendVerificationEmail({user, token: verificationToken, verificationLink: 'ulalam.com'})
}

async function signup({ username, email, password, profileImageBuffer }) {
        await User.validateSignup({username, email, password})

        const userExists = await User.findOne({email})
        if (userExists) {
                if (userExists.email_verified) throw new AppError('User already exist', 400)
        
                

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

        await sendVerificationEmail(user)

        // const token = createToken(user._id)

        return {user: safeUser}
}

async function login({ email, password }) {
        const user = await User.login({email, password})

        const {password_hash, ...safeUser} = user.toObject()        

        const token = createToken(user._id)

        return {token, user: safeUser}
}

function authenticate(authorization) {
        try {
                const token = authorization.split(' ')[1]
                const { _id } = jwt.verify(token, process.env.JWT_SECRET)

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
        authenticate
}