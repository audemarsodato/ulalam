const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

const {
        signup,
        login
} = require('../controllers/authController')

router.post('/signup', upload.single('profile-image'), signup)
router.post('/login', login)

module.exports = router