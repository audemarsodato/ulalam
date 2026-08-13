const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier')

// upload image
async function uploadImage(imageBuffer) {
        const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                        {folder: 'ulalam'},
                        (error, result) => {
                                if (error) {
                                        console.log('Cannot upload image.')
                                        reject(error)
                                        return
                                }
                                resolve(result)
                        }
                )

                streamifier.createReadStream(imageBuffer).pipe(uploadStream)
        })

        return result.secure_url
}

module.exports = {
        uploadImage
}