const mongoose = require('mongoose')


const User = require('../models/userModel')
const Ulam = require('../models/ulamModel')
const AppError = require('../utils/AppError')
const ulamsService = require('./ulamsService')
const imagesService = require('./imagesService')
const { options } = require('../v1/routes/userRoute')

async function getUser(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) throw new AppError('User id is not valid id', 400)
        
        const user = await User.findById(userId).select('-password_hash')

        if (!user) throw new Error('Failed to get user')

        const followers = await User.find({_id: {$in: user.followers}}).select('username profile_image_url followings followers')
        const followings = await User.find({_id: {$in: user.followings}}).select('username profile_image_url followings followers')
        const published_ulams = await Ulam.find({user_id: userId})
        const earned_specialties = await Ulam.find({_id: {$in: user.earned_specialties}})

        return {...user.toObject(), published_ulams, followers, followings, earned_specialties}
}

async function updateCurrentUser({ userId, updates }) {
        if (updates.email || updates.password_hash) throw new AppError('Unauthorized action: Cannot change an email or password', 400) 

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

async function updateProfileImage({ userId, profileImageBuffer }) {
        let profileImageUrl = null
        if (profileImageBuffer) {
                profileImageUrl = await imagesService.uploadImage(profileImageBuffer)
        }

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
                profile_image_url: profileImageUrl
        }, options)

        if (!updatedUser) throw new AppError('Failed to update current users profile image')
        
        const { password_hash, ...safeUser } = updatedUser.toObject()

        return {profile_image_url: updatedUser.profile_image_url, user: safeUser}
}

module.exports = {
        getUser,
        updateCurrentUser,
        followUser,
        unfollowUser,
        updateProfileImage
}