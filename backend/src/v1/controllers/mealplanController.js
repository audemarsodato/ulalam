const mealplanService = require('../../services/mealplanService')

async function addMealplan(req, res) {
        const userId = req.user_id
        const { ulamId, mealtime, date } = req.body

        const missingFields = []

        if (!ulamId) missingFields.push('ulamId')
        if (!mealtime) missingFields.push('mealtime')
        if (!date) missingFields.push('date')

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        try {
                const mealplan = await mealplanService.addMealplan({ulamId, userId, mealtime, dateString: date})
                res.status(200).json(mealplan)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}
async function getMealplans(req, res) {
        const userId = req.user_id

        try {
                const mealplans = await mealplanService.getMealplans(userId)
                res.status(200).json({mealplans})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function updateMealplan(req, res) {
        const userId = req.user_id
        const { mealplanId } = req.params
        const { updates } = req.body ?? {}

        if (!updates || Object.keys(updates).length === 0) return res.status(400).json({error: {message: 'Cannot update mealplan without updates'}})

        try {
                const mealplan = await mealplanService.updateMealplan({mealplanId, userId, updates})
                res.status(200).json(mealplan)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function removeMealplan(req, res) {
        const userId = req.user_id
        const { mealplanId } = req.params

        try {
                const mealplan = await mealplanService.removeMealplan({mealplanId, userId})
                res.status(200).json(mealplan)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

module.exports =  {
        addMealplan,
        getMealplans,
        updateMealplan,
        removeMealplan
}