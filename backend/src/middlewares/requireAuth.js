const authService = require('../services/authService')

function requireAuth(req, res, next) {
        const { authorization } = req.headers
        try {
                if (!authorization) return res.status(401).json({error: {message: 'Authorization token required'}})
                
                req.user_id = authService.authenticate(authorization)

                next()
        }
        catch (error) {
                res.status(401).json({error: {message: error.message}})
        }               
}

module.exports = requireAuth