const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
        ulam_id: {
                type: Schema.Types.ObjectId,
                ref: 'Ulam',
                required: true
        },
        user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        content: {
                type: String,
                required: true
        }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
