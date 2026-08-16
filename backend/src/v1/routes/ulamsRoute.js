const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

// TODO: use 201 status code to post methods to indicate succesfully created resource

const {
        createUlam,
        getUlamsFromFollowing,
        getEarnedSpecialties,
        getUlams,
        updateUlam,
        deleteUlam,
        likeUlam,
        unlikeUlam,
        bookmarkUlam,
        unbookmarkUlam,
        createComment,
        getUlamComments,
        getAnUlam
} = require('../controllers/ulamsController')

// CREATE ulam
router.post('/', upload.single('imageFile'), createUlam)

// GET ulams from following
router.get('/from-following', getUlamsFromFollowing)

// GET earned specialty ulams
router.get('/earned-specialties', getEarnedSpecialties)

// GET ulams using query parameters
router.get('/', getUlams)

// GET a single ulam profile
router.get('/:ulamId', getAnUlam)

// UPDATE a user's ulam
router.patch('/:ulamId', updateUlam)

// DELETE a user's ulam
router.delete('/:ulamId', deleteUlam)

// LIKE an ulam
router.patch('/:ulamId/like', likeUlam)

// UNLIKE an ulam
router.delete('/:ulamId/like', unlikeUlam)

// BOOKMARK an ulam
router.patch('/:ulamId/bookmark', bookmarkUlam)

// UNBOOKMARK an ulam
router.delete('/:ulamId/bookmark', unbookmarkUlam)

// CREATE comment on an ulam
router.post('/:ulamId/comments', createComment)

// GET comments of an ulam
router.get('/:ulamId/comments', getUlamComments)

module.exports = router