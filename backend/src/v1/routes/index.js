const express = require('express')
const router = express.Router()

const ulamRoutes = require('./ulamRoutes')

router.use('/ulams', ulamRoutes)

router.use('/users', (req, res) => {
        res.send('user routes')
})

router.use('/mealplans', (req, res) => {
        res.send('mealplan routes')
})

router.use('/cooking-logs', (req, res) => {
        res.send('history routes')
})

module.exports = router