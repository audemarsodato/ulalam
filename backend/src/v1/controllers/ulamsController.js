const ulamsService = require('../../services/ulamsService')

// CREATE ulam
async function createUlam(req, res) {
        // syntactic validation e.g. Missing fields
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { name, ingredients: ingredientsString, instructions: instructionsString } = req.body
        const imageBuffer = req.file?.buffer // optional chaining returns undefined when req.file does not exists
        
        const missingFields = []
        
        if (!name?.trim()) missingFields.push('name')
        if (!ingredientsString) missingFields.push('ingredients')
        if (!instructionsString) missingFields.push('instructions')
        if (!imageBuffer) missingFields.push('image')

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        let ingredients
        let instructions

        try {
                ingredients = JSON.parse(ingredientsString)
                instructions = JSON.parse(instructionsString)
        }
        catch {
                return res.status(400).json({error: {message: 'Ingredients and instructions must be valid JSON'}})
        }

        if (!Array.isArray(ingredients) || ingredients.length === 0) missingFields.push('ingredients') // checks if its an array first, 
        if (!Array.isArray(instructions) || instructions.length === 0) missingFields.push('instructions') // does not move to the next check if its not

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        const ulamData = {
                name,
                ingredients,
                instructions,
                imageBuffer,
                userId
        }

        try {
                const ulam = await ulamsService.createUlam(ulamData)

                res.status(201).json(ulam)
        }
        catch (error) {
                // console.error('Create ulam:', error)
                return res.status(500).json({error: {message: `Cannot create ulam: ${error.message}`}})
        }
}

// GET ulams from following
async function getUlamsFromFollowing(req, res) {
        /*
        * Requires user id for operation
        */
        res.status(200).json({ msg: 'get ulams from followings' })
}

// GET earned specialty ulams
async function getEarnedSpecialties(req, res) {
        /*
        * Requires user id for operation
        */
        res.status(200).json({ msg: 'get earned specialties ulams' })
}

// GET ulams using query parameters
async function getUlams(req, res) {
        /*
        * Needs to populate ulams
        */
        res.status(200).json({ msg: 'get ulams by ingredients or other query params' })
}

// UPDATE a user's ulam
async function updateUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 

        const { ulamId } = req.params
        const { updates } = req.body ?? {} // nullish coalescing ??, use the value on the left, if its undefined or null use the value on the right

        if (!updates || Object.keys(updates).length === 0) return res.status(400).json({error: {message: 'Cannot update ulam without updates'}})

        try {
                const updatedUlam = await ulamsService.updateUlam({ulamId, userId, updates})

                res.status(200).json(updatedUlam)
        }
        catch (error) {
                // console.error(error)
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// DELETE a user's ulam
async function deleteUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params

        try {
                const deletedUlam = await ulamsService.deleteUlam({ulamId, userId})
                res.status(200).json(deletedUlam)
        }
        catch (error) {
                // console.error(error)
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}}) // TODO: Structure the error so that you can send a 404 status code
        }
}

// PATCH / LIKE an ulam
async function likeUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params

        try {
               const likedUlam = await ulamsService.likeUlam({ulamId, userId})
               res.status(200).json(likedUlam)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// DELETE / UNLIKE an ulam
async function unlikeUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params

        try {
               const unlikedUlam = await ulamsService.unlikeUlam({ulamId, userId})
               res.status(200).json(unlikedUlam)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// PATCH / BOOKMARK an ulam
async function bookmarkUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params

        try {
               const bookmarkedUlam = await ulamsService.bookmarkUlam({ulamId, userId})
               res.status(200).json(bookmarkedUlam)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// DELETE / UNBOOKMARK an ulam
async function unbookmarkUlam(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params

        try {
               const unbookmarkedUlam = await ulamsService.unbookmarkUlam({ulamId, userId})
               res.status(200).json(unbookmarkedUlam)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

// POST / COMMENT to an ulam
async function createComment(req, res) {
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { ulamId } = req.params
        const { content } = req.body ?? {}

        if (!content) return res.status(400).json({error: {message: 'Missing content for comment'}})

        try {
                const createdComment = await ulamsService.commentToUlam({ulamId, content, userId})
                res.status(200).json(createdComment)
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}


// GET comments of an ulam
async function getUlamComments(req, res) {
        const { ulamId } = req.params
        
        try {
                const comments = await ulamsService.getCommentsOfUlam({ulamId}) 
                res.status(200).json({comments})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

async function getUlam(req, res) {
        const { ulamId } = req.params

        try {
                const ulam = await ulamsService.getUlam({ulamId})
                const comments = await ulamsService.getCommentsOfUlam({ulamId})
                res.status(200).json({...ulam.toObject(), comments})
        }
        catch (error) {
                const statusCode = error.statusCode ?? 500
                res.status(statusCode).json({error: {message: error.message}})
        }
}

module.exports = {
        createUlam,
        getUlamsFromFollowing,
        getEarnedSpecialties,
        getUlams,
        updateUlam,
        deleteUlam,
        likeUlam,
        unlikeUlam,
        bookmarkUlam,
        unbookmarkUlam,
        createComment,
        getUlamComments,
        getUlam
}