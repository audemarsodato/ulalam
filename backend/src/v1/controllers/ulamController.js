const ulamServices = require('../../services/ulamService')

// CREATE ulam
async function createUlam(req, res) {
        // syntactic validation e.g. Missing fields
        const userId = '507f1f77bcf86cd799439011' // req.user._id 
        const { name, ingredients: ingredientsString, instructions: instructionsString } = req.body
        const imageBuffer = req.file?.buffer // optional chaining returns undefined when req.file does not exists
        
        const missingFields = []

        if (!ingredientsString) missingFields.push('ingredients')
        if (!instructionsString) missingFields.push('instructions')

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

        if (!name?.trim()) missingFields.push('name')
        if (!Array.isArray(ingredients) || ingredients.length === 0) missingFields.push('ingredients') // checks if its an array first, 
        if (!Array.isArray(instructions) || instructions.length === 0) missingFields.push('instructions') // does not move to the next check if its not
        if (!imageBuffer) missingFields.push('image')

        if (missingFields.length > 0) return res.status(400).json({error: {message: 'Missing fields', missingFields}})

        const ulamData = {
                name,
                ingredients,
                instructions,
                imageBuffer,
                userId
        }

        try {
                const ulam = await ulamServices.createUlam(ulamData)

                res.status(201).json(ulam)
        }
        catch (error) {
                return res.status(500).json({error: {message: 'Cannot create ulam'}})
        }
}

// GET ulams from following
async function getUlamsFromFollowing(req, res) {
        res.status(200).json({ msg: 'get ulams from followings' })
}

// GET earned specialty ulams
async function getEarnedSpecialties(req, res) {
        res.status(200).json({ msg: 'get earned specialties ulams' })
}

// GET ulams using query parameters
async function getUlams(req, res) {
        res.status(200).json({ msg: 'get ulams by ingredients or other query params' })
}

// UPDATE a user's ulam
async function updateUlam(req, res) {
        res.status(200).json({ msg: 'update an ulams details' })
}

// DELETE a user's ulam
async function deleteUlam(req, res) {
        res.status(200).json({ msg: 'delete a users ulam' })
}

// PATCH / LIKE an ulam
async function likeUlam(req, res) {
        res.status(200).json({ msg: 'like an ulam' })
}

// DELETE / UNLIKE an ulam
async function unlikeUlam(req, res) {
        res.status(200).json({ msg: 'unlike an ulam' })
}

// PATCH / BOOKMARK an ulam
async function bookmarkUlam(req, res) {
        res.status(200).json({ msg: 'bookmark an ulam' })
}

// DELETE / UNBOOKMARK an ulam
async function unbookmarkUlam(req, res) {
        res.status(200).json({ msg: 'unbookmark an ulam' })
}

// POST / COMMENT to an ulam
async function createComment(req, res) {
        res.status(200).json({ msg: 'comment to an ulam' })
}

// GET comments of an ulam
async function getUlamComments(req, res) {
        res.status(200).json({ msg: 'get all comments of an ulam' })
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
        getUlamComments
}