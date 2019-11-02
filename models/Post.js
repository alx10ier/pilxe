const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'PostCategory' },
  title: String,
  abbr: String, // abbreviation
  source: String, // un-translated markdown source text
  content: String, // text to display
  public: { type: String, enum: ['publc', 'private', 'draft']} // todo: do it
})

let Post = mongoose.model('Post', postSchema)
module.exports = Post
