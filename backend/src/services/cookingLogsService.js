const mongoose = require('mongoose')

const CookingLog = require('../models/cookingLogModel')
const User = require('../models/userModel')
const AppError = require('../utils/AppError')

//config or setttings
const mealtimes = ['breakfast', 'lunch', 'dinner']
const mealtimesTimezones = {}
const masteryThreshold = 8

// TODO mealtime must derive from mealtime timezones and not inputed
async function recordSession({ ulamId, userId, mealtime }) {
        if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

        if (!mealtimes.includes(mealtime.trim().toLowerCase())) throw new AppError('Invalid mealtime', 400)
        
        // pauses the async functions execution until the await / Promise settles
        const cookingLog = await CookingLog.create({ulam_id: ulamId, user_id: userId, mealtime: mealtime.trim().toLowerCase()})
        if (!cookingLog) throw new AppError('Failed to record session to logs')
        const timesCooked = await CookingLog.countDocuments({ulam_id: ulamId, user_id: userId})
        
        let isAddedToSpecialties = false
        if (timesCooked >= masteryThreshold) {
                const options = {
                        returnDocument: 'after',
                        runValidators: true
                }

                const user = await User.findOneAndUpdate(
                        {_id: userId}, 
                        {$addToSet: {earned_specialties: ulamId}}, 
                        options
                ).select('earned_specialties')
                if (!user) throw new AppError('Failed to add ulam to specialties')

                isAddedToSpecialties = user.earned_specialties.includes(ulamId)
        }

        return {...cookingLog.toObject(), times_cooked: timesCooked, isAddedToSpecialties}
}

async function getRecords(userId) {
        const records = await CookingLog.find({user_id: userId})

        if (!records) throw new AppError('Failed to fetch records')

        return records
}

// async function countTimesCooked(ulamId) {
//         const timesCooked = await CookingLog.countDocuments({ulam_id: ulamId, user_id: userId})

//         return timesCooked
// }

module.exports = {
        recordSession,
        getRecords
}