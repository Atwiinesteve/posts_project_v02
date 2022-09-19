// =================================================
const mongoose = require('mongoose');

// =================================================
const postsSchema = new mongoose.Schema({

  title: {
    type: 'string',
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  image: {
    type: 'string',
    required: true
  },
  author: {
    type: 'string',
    required: true
  },

}, { timestamps: true });

const Post = mongoose.model("posts", postsSchema);
module.exports = Post;