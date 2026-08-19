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

module.exports = {
        signup,
        login
}