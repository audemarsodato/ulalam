const mongoose = require('mongoose')

const Mealplan = require('../models/mealplanModel')
const { mealtimes } = require('../config/config')
const AppError = require('../utils/AppError')

async function addMealplan({ ulamId, userId, mealtime, dateString }) {
        if (!mongoose.Types.ObjectId.isValid(ulamId)) throw new AppError('Ulam id is not valid id', 400)
        if (!mealtimes.includes(mealtime.trim().toLowerCase())) throw new AppError('Invalid mealtime', 400)
        
        const date = new Date(dateString)
        if (isNaN(date.getTime())) throw new AppError('Invalid date', 400)

        const mealplan = await Mealplan.create({
                ulam_id: ulamId,
                user_id: userId,
                mealtime: mealtime.trim().toLowerCase(),
                date
        })

        if (!mealplan) throw new AppError('Failed to create mealplan')

        return mealplan
}

async function getMealplans(userId) {
        const mealplans = await Mealplan.find({user_id: userId})
        if (!mealplans) throw new AppError('Failed to fetch mealplans')

        return mealplans
}

async function updateMealplan({ mealplanId, updates, userId }) {
        if (!mongoose.Types.ObjectId.isValid(mealplanId)) throw new AppError('Mealplan id is not valid id', 400)

        if (updates.mealtime && !mealtimes.includes(updates.mealtime.trim().toLowerCase())) {
                throw new AppError('Invalid mealtime', 400)
        }

        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const filters = {
                user_id: userId,
                _id: mealplanId
        }

        const updatedMealplan = await Mealplan.findOneAndUpdate(filters, updates, options)

        if (!updatedMealplan) throw new AppError('Failed to update mealplan')
        
        return updatedMealplan
}

async function removeMealplan({ mealplanId, userId }) {
        if (!mongoose.Types.ObjectId.isValid(mealplanId)) throw new AppError('Mealplan id is not valid id', 400)

                
        const options = {
                returnDocument: 'after',
                runValidators: true
        }

        const filters = {
                user_id: userId,
                _id: mealplanId
        }

        const removedMealplan = await Mealplan.findOneAndDelete(filters, options)
        
        if (!removedMealplan) throw new AppError('Failed to remove mealplan')

        return removedMealplan
}

module.exports =  {
        addMealplan,
        getMealplans,
        updateMealplan,
        removeMealplan
}