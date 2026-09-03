const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')


const {
        createUlam,
        getUlams,
        updateUlam,
        deleteUlam,
        likeUlam,
        unlikeUlam,
        bookmarkUlam,
        unbookmarkUlam,
        createComment,
        getUlamComments,
        getUlam,
        getVariationsOfUlam
} = require('../controllers/ulamsController')

// CREATE ulam
router.post('/', upload.single('image-file'), createUlam)

// GET ulams using query parameters
router.get('/', getUlams)

// GET a single ulam profile
router.get('/:ulamId', getUlam)

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

router.get('/:ulamId/variations', getVariationsOfUlam)

module.exports = router