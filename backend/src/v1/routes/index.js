const express = require('express')
const router = express.Router()

const ulamsRoute = require('./ulamsRoute')
const usersRoute = require('./UsersRoute')

router.use('/ulams', ulamsRoute)

router.use('/users', usersRoute)

router.use('/mealplans', (req, res) => {
        res.send('mealplan routes')
})

router.use('/cooking-logs', (req, res) => {
        res.send('history routes')
})

module.exports = router