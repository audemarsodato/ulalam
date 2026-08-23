const express = require('express')
const router = express.Router()

const requireAuth = require('../../middlewares/requireAuth')
const authRoute = require('./authRoute')
const ulamsRoute = require('./ulamsRoute')
const cookingLogsRoute = require('./cookingLogsRoute')
const userRoute = require('./userRoute')
const mealplanRoute = require('./mealplanRoute')

router.use('/auth', authRoute)

router.use(requireAuth)

router.use('/users', userRoute)

router.use('/ulams', ulamsRoute)

router.use('/mealplans', mealplanRoute)

router.use('/cooking-logs', cookingLogsRoute)

module.exports = router