const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

const {
        getCurrentUser,
        updateCurrentUser,
        getUser,
        followUser,
        unfollowUser,
        getPublishedUlams,
        getUlamsFromFollowings,
        getEarnedSpecialties,
        updateProfileImageCurrentUser
} = require('../controllers/userController')

// GET current users details except password hash
router.get('/me', getCurrentUser)

router.patch('/me', updateCurrentUser)

router.get('/:username', getUser)

router.post('/:userId/following', followUser)

router.delete('/:userId/following', unfollowUser)

// get the user's ulams from followings for home page
router.get('/me/ulams/from-following', getUlamsFromFollowings)

// get users earned specialties
router.get('/:userId/ulams/earned-specialties', getEarnedSpecialties)

router.get('/:userId/ulams', getPublishedUlams)

router.patch('/me/profile-image', upload.single('profile-image'), updateProfileImageCurrentUser)

// router.post('/me/ulams/earned-specialties/:ulamId', addToSpecialties)
// whats the design for determining earned specialties?

module.exports = router