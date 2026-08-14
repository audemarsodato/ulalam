
function handle404(req, res, next) {
        res.status(404).json({error: {message: `Error 404: Requested path ${req.path} was not found`}})
        next()
}

module.exports = handle404