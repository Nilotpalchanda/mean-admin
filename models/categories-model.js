const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const catSchema = new Schema({
    categoriesname: String
})

const Categories = mongoose.model('categories', catSchema)

module.exports = Categories