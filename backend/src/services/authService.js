const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const imagesService = require('./imagesService')
const AppError = require('../utils/AppError')

function createToken(_id) {
        return jwt.sign({_id}, process.env.JWT_SECRET)
}

async function signup({ username, email, password, profileImageBuffer }) {
        await User.validateSignup({username, email, password})

        let profileImageUrl = null
        if (profileImageBuffer) {
                profileImageUrl = await imagesService.uploadImage(profileImageBuffer)
        }

        const user = await User.signup({username, email, password, profileImageUrl})

        const token = createToken(user._id)

        return {token, user}
}

async function login({ email, password }) {
        const user = await User.login({email, password})
        const token = createToken(user._id)

        return {token, user}
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