const userService = require('../../services/userService')

async function getCurrentUser(req, res) {
        const userId = req.user_id

        try {
                const user = await userService.getUser(userId)
                res.status(200).json({message: 'getCurrentUser', user})
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
                res.status(200).json(updatedUser)
        } catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function getUser(req, res) {
        const { userId } = re.params

        // same as getCurrentUser
        try {
                res.status(200).json({message: 'getUser'})
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
                res.status(200).json({currentUser, targetUser})
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
        try {
                res.status(200).json({message: 'getPublishedUlams'})
        } catch (error) {
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
        getPublishedUlams
}