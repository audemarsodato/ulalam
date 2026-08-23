const cookingLogsService = require('../../services/cookingLogsService')

// POST record to log
async function recordSession(req, res) {
        const userId = req.user_id
        const { ulamId } = req.body ?? {}

        const missingFields = []

        if (!ulamId) missingFields.push('ulamId')

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        try {
                const cookingLog = await cookingLogsService.recordSession({ulamId, userId})
                res.status(200).json(cookingLog)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// GET records from log
async function getRecords(req, res) {
        const userId = req.user_id

        try {
                const records = await cookingLogsService.getRecords(userId)
                res.status(200).json({records})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// DELETE all records from log
async function clearHistory(req, res) {
        res.status(200).json({message: 'Clear history in development'})
}

module.exports = {
        recordSession,
        getRecords,
        clearHistory
}