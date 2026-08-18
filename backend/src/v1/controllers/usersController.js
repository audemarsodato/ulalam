const usersService = require('../../services/usersService')

async function signup(req, res) {
        const {
                email,
                password,
                username,
        } = req.body
        const profileImageBuffer = req.file?.buffer

        const missingFields = []

        if (!email) missingFields.push('email')
        if (!password) missingFields.push('password')
        if (!username) missingFields.push('username')

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        try {
                const user = await usersService.signup({username, email, password, profileImageBuffer})
                res.status(200).json({message: 'signup', user})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function login(req, res) {
        res.status(200).json({message: 'login'})
}

module.exports = {
        signup, 
        login
}