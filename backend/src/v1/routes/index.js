const express = require('express')
const router = express.Router()

const requireAuth = require('../../middlewares/requireAuth')
const authRoute = require('./authRoute')
const ulamsRoute = require('./ulamsRoute')
const cookingLogsRoute = require('./cookingLogsRoute')
const userRoute = require('./userRoute')

router.use('/auth', authRoute)

router.use(requireAuth)

router.use('/users', userRoute)

router.use('/ulams', ulamsRoute)

router.use('/mealplans', (req, res) => {
        res.send('mealplan routes')
})

router.use('/cooking-logs', cookingLogsRoute)

module.exports = router