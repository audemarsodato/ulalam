const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

const {
        signup,
        login,
        verifyEmail,
        sendEmailVerification,
        continueWithGoogle
} = require('../controllers/authController')

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/verification-email', sendEmailVerification)
router.post('/login', login)
router.post('/google', continueWithGoogle)

module.exports = router