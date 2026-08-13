
// CREATE ulam
async function createUlam(req, res) {
        res.status(200).json({ msg: 'POST or create ulam' })
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