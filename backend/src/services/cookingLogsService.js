const mongoose = require('mongoose')

const CookingLog = require('../models/cookingLogModel')
const User = require('../models/userModel')
const Ulam = require('../models/ulamModel')
const AppError = require('../utils/AppError')
const { masteryThreshold } = require('../config/config')

/*
* mealtimes hour here is determined by the cooking time in mind, therefore the the time the ulam is cooked determines the mealtime
* breakfast: 6am - 10am / 360 - 600
* lunch: 10am - 2pm / 601 - 840
* dinner: 5pm - 9pm / 1020 - 1260
* meryenda: 2pm - 5pm and 9pm - 1am / 841 - 1019 || 1259 - 1239 || 0 - 60
*
* How would you determine the range?
* Sinigang is cooked at 10:30am, how would you calculate time to determine the mealtime?
* Use 24hour / military time
* convert to minutes from midnight
* hour * 60 + minutes
*/

function getMealtime(timeCooked) {
        const hour = timeCooked.getHours()
        const minutes = timeCooked.getMinutes()
        const timeCookedInMinutes = hour * 60 + minutes
        let mealtime = ''

        if (timeCookedInMinutes >= 360 && timeCookedInMinutes < 600) mealtime = 'breakfast'
        if (timeCookedInMinutes >= 601 && timeCookedInMinutes < 840) mealtime = 'lunch'
        if (timeCookedInMinutes >= 840 && timeCookedInMinutes < 1020) mealtime = 'meryenda'
        if (timeCookedInMinutes >= 1020 && timeCookedInMinutes < 1260) mealtime = 'dinner'
        if (timeCookedInMinutes >= 1260 || timeCookedInMinutes < 60) mealtime = 'meryenda'

        return mealtime
}

async function recordSession({ ulamId, userId }) {
        if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

        const timeCooked = new Date()
        const mealtime = getMealtime(timeCooked)
        
        // pauses the async functions execution until the await / Promise settles
        const cookingLog = await CookingLog.create({ulam_id: ulamId, user_id: userId, mealtime})
        if (!cookingLog) throw new AppError('Failed to record session to logs')
        const timesCooked = await CookingLog.countDocuments({ulam_id: ulamId, user_id: userId})
        
        const options = {
                returnDocument: 'after',
                runValidators: true
        }
        let isAddedToSpecialties = false
        if (timesCooked >= masteryThreshold) {

                const user = await User.findOneAndUpdate(
                        {_id: userId}, 
                        {$addToSet: {earned_specialties: ulamId}}, 
                        options
                ).select('earned_specialties')
                if (!user) throw new AppError('Failed to add ulam to specialties')

                isAddedToSpecialties = user.earned_specialties.includes(ulamId)
        }

        const isNewlyAdded = timesCooked === masteryThreshold && isAddedToSpecialties

        // const cookedCount = await CookingLog.countDocuments({ulam_id: ulamId}) 
        const ulam = await Ulam.findByIdAndUpdate(ulamId, {$inc: {cooked_count: 1}}, options) // is this good now though? 

        if (!ulam) throw new AppError('Failed to update ulam cooked count')

        return {...cookingLog.toObject(), times_cooked: timesCooked, isNewlyAdded}
}

async function getRecords(userId) {
        const records = await CookingLog.find({user_id: userId}).sort({createdAt: -1}).populate('ulam_id')

        if (!records) throw new AppError('Failed to fetch records')

        return records
}

module.exports = {
        recordSession,
        getRecords
}