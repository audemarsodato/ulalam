const express = require('express')
const router = express.Router()

// TODO: use 201 status code to post methods to indicate succesfully created resource

// CREATE ulam
router.post('/', (req, res) => {
        res.status(200).json({msg: 'POST or create ulam'})
})

// GET ulams from following
router.get('/from-following', (req, res) => {
        res.status(200).json({msg: 'get ulams from followings'})
})

// GET earned specialty ulams
router.get('/earned-specialties', (req, res) => {
       res.status(200).json({msg: 'get earned specialties ulams'})
})

// GET ulams by ingredients using query parameters
router.get('/', (req, res) => {
       res.status(200).json({msg: 'get ulams by ingredients or other query params'})
})

// UPDATE a user's ulam
router.patch('/:ulamId', (req, res) => {
       res.status(200).json({msg: 'update an ulams details'})
})

// DELETE a user's ulam
router.delete('/:ulamId', (req, res) => {
       res.status(200).json({msg: 'delete a users ulam'})
})

// PATCH / LIKE an ulam
router.patch('/:ulamId/like', (req, res) => {
       res.status(200).json({msg: 'like an ulam'})
})

// DELETE / UNLIKE an ulam
router.delete('/:ulamId/like', (req, res) => {
        res.status(200).json({msg: 'unlike an ulam'})
})

// PATCH / BOOKMARK an ulam
router.patch('/:ulamId/bookmark', (req, res) => {
        res.status(200).json({msg: 'bookmark an ulam'})
})

// DELETE / UNBOOKMARK an ulam
router.delete('/:ulamId/bookmark', (req, res) => {
        res.status(200).json({msg: 'unbookmark an ulam'})
})

// POST / COMMENT to an ulam
router.post('/:ulamId/comments', (req, res) => {
       res.status(200).json({msg: 'comment to an ulam'})
})

// GET comments of an ulam
router.get('/:ulamId/comments', (req, res) => {
       res.status(200).json({msg: 'get all comments of an ulam'})
})

module.exports = router