const mongoose = require('mongoose')


const User = require('../models/userModel')
const Ulam = require('../models/ulamModel')
const AppError = require('../utils/AppError')

async function getUser(userId) {
        const user = await User.findById(userId).select('-password_hash')

        if (!user) throw new Error('Failed to get user')

        return user
}

async function updateCurrentUser({ userId, updates }) {
        if (updates.email || updates.password_hash) throw new AppError('Unauthorized action: Cannot change an email or password', 400) // TODO create a secure endpoint for chage email and change password with proper authorixation

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, options).select('-password_hash')

        if (!updatedUser) throw new AppError('Failed to update current users details')

        return updatedUser
}

async function followUser({ currentUserId, targetUserId }) {
        if (!mongoose.Types.ObjectId.isValid(targetUserId)) throw new AppError('Target user id is not valid id', 400)

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const currentUser = await User.findByIdAndUpdate(currentUserId, {
                $addToSet: {followings: targetUserId}
        }, options).select('followings')

        const targetUser = await User.findByIdAndUpdate(targetUserId, {
                $addToSet: {followers: currentUserId}
        }, options).select('followers')

        const followSuccess = currentUser.followings.includes(targetUserId) && targetUser.followers.includes(currentUserId)
        if (!followSuccess) throw new AppError('Failed to follow user')

        return {currentUser, targetUser}
}

async function unfollowUser({ currentUserId, targetUserId }) {
        if (!mongoose.Types.ObjectId.isValid(targetUserId)) throw new AppError('Target user id is not valid id', 400)

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const currentUser = await User.findByIdAndUpdate(currentUserId, {
                $pull: {followings: targetUserId}
        }, options).select('followings')

        const targetUser = await User.findByIdAndUpdate(targetUserId, {
                $pull: {followers: currentUserId}
        }, options).select('followers')

        const unfollowSuccess = !currentUser.followings.includes(targetUserId) && !targetUser.followers.includes(currentUserId)
        if (!unfollowSuccess) throw new AppError('Failed to follow user')

        return {currentUser, targetUser}
}

module.exports = {
        getUser,
        updateCurrentUser,
        followUser,
        unfollowUser
}