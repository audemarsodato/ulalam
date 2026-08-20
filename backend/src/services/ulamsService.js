const mongoose = require('mongoose')

const Ulam = require('../models/ulamModel')
const Comment = require('../models/commentsModel')
const imagesService = require('./imagesService')
const AppError = require('../utils/AppError')
const User = require('../models/userModel')

/* create ulam document to the database
* input: ulam: name, ingredients, instructions, userid
* semantic or business validation that involves the database e.g. User already exist trying to signup again
* process: 
*       upload image using image service
*       get image url
*       create the document and pass:
*               name, inageurl, ingredients, instructions, userId
* output: document created in the ulams collection
*/
async function createUlam({ name, ingredients, instructions, userId, imageBuffer }) {
        try {
                const imageUrl = await imagesService.uploadImage(imageBuffer)
                // TODO: validate if image uploaded successfully

                const ulam = await Ulam.create({
                        name,
                        image_Url: imageUrl,
                        ingredients,
                        instructions,
                        user_id: new mongoose.Types.ObjectId(userId) // TODO: put objectication in authentication when attaching it to req
                })

                if (!ulam) throw new Error('Failed to create ulam')

                return ulam
        }
        catch(error) {
                throw error
        }
}

async function updateUlam({ ulamId, userId, updates }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

                const filters = {
                        _id: ulamId,
                        user_id: userId
                }
 
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }
                
                const updatedUlam = await Ulam.findOneAndUpdate(filters, updates, options)

                if (!updatedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)

                return updatedUlam
        }
        catch (error) {
                throw error
        }
}

async function deleteUlam({ ulamId, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
                
                const deletedUlam = await Ulam.findOneAndDelete({_id: ulamId, user_id: userId})

                if (!deletedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)
                
                return deleteUlam
        }
        catch (error) {
               throw error
        }
}

async function likeUlam({ ulamId, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
                
                const filters = {
                        _id: ulamId,
                        user_id: userId
                }
        
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }
                
                const likedUlam = await Ulam.findOneAndUpdate(filters, {$addToSet: {liked_by: new mongoose.Types.ObjectId(userId)}}, options)

                if (!likedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)

                return likedUlam
        }
        catch (error) {
               throw error
        }
}

async function unlikeUlam({ ulamId, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
                
                const filters = {
                        _id: ulamId,
                        user_id: userId
                }
        
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }
                
                const unlikedUlam = await Ulam.findOneAndUpdate(filters, {$pull: {liked_by: new mongoose.Types.ObjectId(userId)}}, options)

                if (!unlikedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)

                return unlikedUlam
        }
        catch (error) {
               throw error
        }
}

async function bookmarkUlam({ ulamId, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
                
                const filters = {
                        _id: ulamId,
                        user_id: userId
                }
        
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }
                
                const bookmarkedUlam = await Ulam.findOneAndUpdate(filters, {$addToSet: {bookmarked_by: new mongoose.Types.ObjectId(userId)}}, options)

                if (!bookmarkedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)

                return bookmarkedUlam
        }
        catch (error) {
               throw error
        }
}

async function unbookmarkUlam({ ulamId, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
                
                const filters = {
                        _id: ulamId,
                        user_id: userId
                }
        
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }
                
                const unbookmarkedUlam = await Ulam.findOneAndUpdate(filters, {$pull: {bookmarked_by: new mongoose.Types.ObjectId(userId)}}, options)

                if (!unbookmarkedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)

                return unbookmarkedUlam
        }
        catch (error) {
               throw error
        }
}

async function commentToUlam({ ulamId, content, userId }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

                const commentData = {
                        ulam_id: new mongoose.Types.ObjectId(ulamId),
                        user_id: new mongoose.Types.ObjectId(userId),
                        content
                }

                const comment = await Comment.create(commentData)

                if (!comment) throw new Error('Failed to comment to ulam')

                return comment
        }
        catch (error) {
               throw error
        }
}

async function getCommentsOfUlam(ulamId) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

                const comments = await Comment.find({ulam_id: ulamId})

                if (!comments) throw new AppError('Cannot find ulam', 404)

                return comments
        }
        catch (error) {
               throw error
        }
}

async function getUlam(ulamId) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

                const ulam = await Ulam.findById(ulamId)

                if (!ulam) throw new AppError('Cannot find ulam', 404)

                return ulam
        }
        catch (error) {
               throw error
        }
}

async function getUlams() {
        // query params
}

/*
* .select('followings') returns the field 'followings' and _id only
* .lean() skips the process of transforming the document into an mongoose document
*       making it lightweight and faster since there is no methods attached
*       thus making the object read only without the methods from mongoose document
* $in filters and takes documents that matches the vales inside the array
*/
async function getUlamsFromFollowings(userId) {
        const user = await User.findById(userId).select('followings').lean()

        if (!user) throw new AppError('Failed to find user', 400) // TODO redundant since user once logged in is already created and every request is authenticated already by the middleware

        const ulams = await Ulam.find({user_id: {$in: user.followings}})

        return ulams
}

async function getEarnedSpecialties(userId) {
        const user = await User.findById(userId).select('earned_specialties').lean()

        if (!user) throw new AppError('Failed to find user', 400)

        const ulams = await Ulam.find({_id: {$in: user.earned_specialties}})

        return ulams
}



module.exports = {
        createUlam,
        updateUlam,
        deleteUlam,
        likeUlam,
        unlikeUlam,
        bookmarkUlam,
        unbookmarkUlam,
        commentToUlam,
        getCommentsOfUlam,
        getUlam,
        getUlamsFromFollowings,
        getEarnedSpecialties
}