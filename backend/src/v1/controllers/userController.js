const userService = require('../../services/userService')
const ulamsService = require('../../services/ulamsService')

async function getCurrentUser(req, res) {
        const userId = req.user_id

        try {
                const user = await userService.getUser(userId)
                res.status(200).json({user})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function updateCurrentUser(req, res) {
        const userId = req.user_id
        const { updates } = req.body ?? {}

        if (!updates || Object.keys(updates).length === 0) return res.status(400).json({error: {message: 'Cannot update user without updates'}})

        try {
                const updatedUser = await userService.updateCurrentUser({userId, updates})
                res.status(200).json({updatedUser})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function getUser(req, res) {
        const { username } = req.params

        try {
                const user = await userService.getUserByUsername(username)
                res.status(200).json({user})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function followUser(req, res) {
        const currentUserId = req.user_id
        const targetUserId = req.params.userId

        try {
                const { currentUser, targetUser } = await userService.followUser({currentUserId, targetUserId})
                res.status(201).json({currentUser, targetUser})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function unfollowUser(req, res) {
        const currentUserId = req.user_id
        const targetUserId = req.params.userId

        try {
                const { currentUser, targetUser } = await userService.unfollowUser({currentUserId, targetUserId})
                res.status(200).json({currentUser, targetUser})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function getPublishedUlams(req, res) {
        const { userId } = req.params

        try {
                const publishedUlams = await ulamsService.getPublishedUlams(userId)
                res.status(200).json({published_ulams: publishedUlams})
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function getUlamsFromFollowings(req, res) {
        const userId = req.user_id

        try {
                const ulams = await ulamsService.getUlamsFromFollowings(userId)
                res.status(200).json({ulams_from_followings: ulams})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// GET earned specialty ulams
async function getEarnedSpecialties(req, res) {
        const { userId } = req.params

        try {
                const ulams = await ulamsService.getEarnedSpecialties(userId)
                res.status(200).json({specialties: ulams})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function updateProfileImageCurrentUser(req, res) {
        const userId = req.user_id

        if (!req.file) return res.status(400).json({error: {message: 'Profile image is required'}})
        const profileImageBuffer = req.file.buffer

        try {
                const { profile_image_url, user } = await userService.updateProfileImage({userId, profileImageBuffer})
                res.status(200).json({profile_image_url, user})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}


module.exports = {
        getCurrentUser,
        updateCurrentUser,
        getUser,
        followUser,
        unfollowUser,
        getPublishedUlams,
        getUlamsFromFollowings,
        getEarnedSpecialties,
        updateProfileImageCurrentUser
}