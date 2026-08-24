const express = require('express')
const router = express.Router()

const {
        addMealplan,
        getMealplans,
        updateMealplan,
        removeMealplan
} = require('../controllers/mealplanController')

router.post('/', addMealplan)

router.get('/', getMealplans)

router.patch('/:mealplanId', updateMealplan)

router.delete('/:mealplanId', removeMealplan)

module.exports = router