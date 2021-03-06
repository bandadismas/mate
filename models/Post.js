const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {timestamps: true});
  

module.exports = mongoose.model('Post', PostSchema);