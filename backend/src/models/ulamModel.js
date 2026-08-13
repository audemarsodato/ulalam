const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
* required items are what needs to be pass when creating the document
*/

const ulamSchema = new Schema({
        name: {
                type: String,
                required: true
        },
        image_Url: {
                type: String,
                required: true
        },
        ingredients: {
                type: [String],
                required: true
        },
        instructions: {
                type: [String],
                required: true
        },
        user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        liked_by: {
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                }],
                default: []
        },
        bookmarked_by: {
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                }],
                default: []
        },
        variation_of: {
                type: Schema.Types.ObjectId,
                ref: 'Ulam',
                default: null
        },
        cooked_count: {
                type: Number,
                default: 0
        }
}, { timestamps: true })

const Ulam = mongoose.model('Ulam', ulamSchema)
module.exports = Ulam