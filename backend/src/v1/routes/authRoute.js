const express = require('express')
const router = express.Router()

const upload = require('../../middlewares/multer')

const {
        signup,
        login,
        verifyEmail,
        sendEmailVerification
} = require('../controllers/authController')

router.post('/signup', signup) // TODO refactor no need to pass image in signup, its now seperate, signup creates the account, update user now takes repsonsibility for completing profile setup
router.post('/verify-email', verifyEmail)
router.post('/verification-email', sendEmailVerification)
router.post('/login', login)

module.exports = router