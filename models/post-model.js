const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    post_title: String,
    post_categories:String,
    post_tag: String,
    post_content: String

})

const Posts = mongoose.model('posts', postSchema)

module.exports = Posts