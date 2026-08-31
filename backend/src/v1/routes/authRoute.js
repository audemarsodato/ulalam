const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

const {
        signup,
        login,
        verifyEmail,
        sendEmailVerification
} = require('../controllers/authController')

router.post('/signup', upload.single('profile-image'), signup)
router.post('/verify-email', verifyEmail)
router.post('/verification-email', sendEmailVerification)
router.post('/login', login)

module.exports = router