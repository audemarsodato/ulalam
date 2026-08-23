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

// - ```POST /api/v1/mealplans```, creat a mealplan
// - ```GET /api/v1/mealplans```, get mealplans starting from the current day upto the next 7 days
// - ```PATCH /api/v1/mealplans/:mealplanId```, update details of a mealplan
// - ```DELETE /api/v1/mealplans/:mealplanId```, remove a mealplan

module.exports = router