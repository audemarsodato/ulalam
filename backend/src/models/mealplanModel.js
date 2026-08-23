const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealplanSchema = new  Schema({
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
        },
        date: {
                type: Date,
                required: true
        }
}, { timestamps: true })

const Mealplan = mongoose.model('Mealplan', mealplanSchema)

module.exports = Mealplan