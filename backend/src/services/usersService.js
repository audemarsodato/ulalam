const User = require('../models/userModel')
const imagesService = require('./imagesService')

async function signup({ username, email, password, profileImageBuffer }) {
        await User.validateSignup({username, email, password})

        let profileImageUrl
        if (profileImageBuffer) {
                profileImageUrl = await imagesService.uploadImage(profileImageBuffer)
        }

        const user = await User.signup({username, email, password, profileImageUrl})

        return user
}

module.exports = {
        signup,
        // login
}