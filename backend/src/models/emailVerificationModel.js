const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailVerificationSchema = new Schema({
        user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        email: {
                type: String,
                required: true
        },
        token_hash: {
                type: String,
                required: true
        },
        expires_at: {
                type: Date,
                required: true
        }
})

const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema)

module.exports = EmailVerification