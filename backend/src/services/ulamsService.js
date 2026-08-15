const mongoose = require('mongoose')

const Ulam = require('../models/ulamModel')
const imageServices = require('./imagesService')
const AppError = require('../utils/AppError')

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
                const imageUrl = await imageServices.uploadImage(imageBuffer)

                const ulam = await Ulam.create({
                        name,
                        image_Url: imageUrl,
                        ingredients,
                        instructions,
                        user_id: new mongoose.Types.ObjectId(userId) // TODO: put objectication in authentication when attaching it to req
                })

                return ulam
        }
        catch(error) {
                throw error
        }
}

async function updateUlam({ ulamId, userId, updates }) {
        try {
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new Error('Ulam id is not valid id')

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
                if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new Error('Ulam id is not valid id')
                
                const deletedUlam = await Ulam.findOneAndDelete({_id: ulamId, user_id: userId})

                if (!deletedUlam) throw new AppError('Ulam does not exist or the user does not own the ulam', 404)
                
                return deleteUlam
        }
        catch (error) {
               throw error
        }
}

module.exports = {
        createUlam,
        updateUlam,
        deleteUlam,
}