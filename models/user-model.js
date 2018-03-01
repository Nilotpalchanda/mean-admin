const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    googleId: String,
    githubId: String,
    twitterId: String,
    instagramId: String,
    thumbnail:String
})

const User = mongoose.model('user', userSchema)

module.exports = User