
class AppError extends Error {
        constructor(message, statusCode, code, payload) {
                super(message)
                this.statusCode = statusCode || 500
                this.code = code
                this.payload = payload
        }
}

module.exports = AppError