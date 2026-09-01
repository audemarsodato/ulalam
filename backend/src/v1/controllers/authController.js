const authService = require('../../services/authService')
const { checkMissingFields } = require('../../utils/utils')

async function signup(req, res) {
        const {
                email,
                password,
                username,
        } = req.body ?? {}

        const missingFields = checkMissingFields({email, password, username})

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        try {
                const { user } = await authService.signup({username, email, password })
                res.status(201).json({user})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function verifyEmail(req, res) {
        const { token: verificationToken } = req.body ?? {}

        if (!verificationToken) return res.status(400).json({error: {message: 'Verification token is required'}})

        try {
                const { user, token } = await authService.verifyEmail(verificationToken)
                res.status(200).json({...user, token})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function login(req, res) {
        const { email, password } = req.body ?? {}

        const missingFields = checkMissingFields({email, password})
        
        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        try {
                const { token, user } = await authService.login({email, password})
                res.status(200).json({...user, token})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message, code: error.code, payload: error.payload}})
        }
}

async function sendEmailVerification(req, res) {
        const { user } = req.body ?? {}

        if (!user) return res.status(400).json({error: {message: 'Requires user for resending email verification'}})
        
        try {
                const emailInfo = await authService.sendVerificationEmail(user)
                res.status(200).json({emailInfo})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

module.exports = {
        signup, 
        login,
        verifyEmail,
        sendEmailVerification
}