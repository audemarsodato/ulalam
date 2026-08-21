const mongoose = require('mongoose')

const CookingLog = require('../models/cookingLogModel')
const AppError = require('../utils/AppError')

const mealtimes = ['breakfast', 'lunch', 'dinner']

async function recordSession({ ulamId, userId, mealtime }) {
        if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)

        if (!mealtimes.includes(mealtime.trim().toLowerCase())) throw new AppError('Invalid mealtime', 400)
        
        const cookingLog = await CookingLog.create({ulam_id: ulamId, user_id: userId, mealtime})

        if (!cookingLog) throw new AppError('Failed to record session to logs')

        return cookingLog
}

async function getRecords(userId) {
        const records = await CookingLog.find({user_id: userId})

        if (!records) throw new AppError('Failed to fetch records')

        return records
}

module.exports = {
        recordSession,
        getRecords
}