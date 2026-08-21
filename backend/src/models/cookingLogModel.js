const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cookingLogSchema = new  Schema({
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
        mealtime: {
                type: String,
                required: true
        }
}, { timestamps: true })

const CookingLog = mongoose.model('CookingLog', cookingLogSchema)

module.exports = CookingLog