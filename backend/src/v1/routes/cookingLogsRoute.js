const express = require('express')
const router = express.Router()

const {
        recordSession,
        getRecords,
        clearHistory
} = require('../controllers/cookingLogsController')

// POST record to log
router.post('/', recordSession)

// GET records from log
router.get('/', getRecords)

// DELETE all records from log
router.delete('/', clearHistory)

module.exports = router