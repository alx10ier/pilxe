const mongoose = require('mongoose')
const Post = require('./Post')

const postCategorySchema = mongoose.Schema({
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

let PostCategory = mongoose.model('PostCategory', postCategorySchema)
module.exports = PostCategory