const mongoose = require('mongoose')
const AppError = require('../utils/AppError')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
        username: {
                type: String,
                required: true,
                unique: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password_hash: {
                type: String,
                required: true
        },
        profile_image_url: {
                type: String,
                default: null
        },
        followers: {
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                }],
                default: []
        },
        followings: {
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                }],
                default: []
        },
        earned_specialties: {
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'Ulam'
                }],
                default: []
        }
})

userSchema.statics.validateSignup = async function({ username, email, password }) {
        const [ emailInUse, usernameTaken ] = await Promise.all([
                this.findOne({email}),
                this.findOne({username})
        ])
        if (emailInUse) throw new AppError('Email already in use', 400)
                
        if (usernameTaken) throw new AppError('Username already taken', 400)
        
        if (!validator.isEmail(email)) throw new AppError('Invalid email', 400)
        if (!validator.isStrongPassword(password)) throw new AppError('Weak password', 400)
}

userSchema.statics.signup = async function({ username, email, password, profileImageUrl }) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userData = {
                username,
                email,
                password_hash: passwordHash,
        }

        if (profileImageUrl) {
                userData.profile_image_url = profileImageUrl
        }

        const user = await this.create(userData)

        return user
}

userSchema.statics.login = async function({ email, password }) {

}

const User = mongoose.model('User', userSchema)
module.exports = User