const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
}, {timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);