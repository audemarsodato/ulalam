const express = require('express')
const router = express.Router()

const requireAuth = require('../../middlewares/requireAuth')
const ulamsRoute = require('./ulamsRoute')
const authRoute = require('./authRoute')

router.use('/auth', authRoute)

router.use(requireAuth)

router.use('/ulams', ulamsRoute)

router.use('/mealplans', (req, res) => {
        res.send('mealplan routes')
})

router.use('/cooking-logs', (req, res) => {
        res.send('history routes')
})

module.exports = router