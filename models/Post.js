const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    slug: {type: String, lowercase: true, unique: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {timestamps: true});

PostSchema.pre('save', async (next) => {
    if(!this.slug)  {
      await this.slugify();
    }
  
    next();
  });
  
  PostSchema.methods.slugify = () => {
    this.slug = slug(this.body[7]) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };

module.exports = mongoose.model('Post', PostSchema);