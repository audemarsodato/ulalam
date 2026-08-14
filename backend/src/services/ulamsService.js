const mongoose = require('mongoose')

const Ulam = require('../models/ulamModel')
const imageServices = require('./imagesService')

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
                // check if ulamId is valid objectId, throw error if not
                return { ulamId, userId, updates }
        }
        catch (error) {

        }
}

module.exports = {
        createUlam,
        updateUlam
}