const express = require('express')
const router = express.Router()

const {
        getCurrentUser,
        updateCurrentUser,
        getUser,
        followUser,
        unfollowUser,
        getPublishedUlams
} = require('../controllers/userController')

// GET current users details except password hash
router.get('/me', getCurrentUser)

router.patch('/me', updateCurrentUser)

router.get('/:userId', getUser)

router.post('/:userId/following', followUser)

router.delete('/:userId/following', unfollowUser)

router.get('/:userId/ulams', getPublishedUlams)

module.exports = router