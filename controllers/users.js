// =================================================
const multer = require('multer');
const path = require('path');
require("dotenv").config();



// =================================================
const Post = require('../models/Post');



// =================================================

// ==========================
// ==== API GET FUNCTIONS====
// ==========================

// ==========================

function welcome(request, response) {
  return response.status(200).render('home', { title: 'Home'});
}


// =================================================

// ===========================
// ==== API POST FUNCTIONS====
// ===========================

// upload images.
const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function(request, file, cb) {
    cb(null, file.fieldname + Date.now() + "---" + file.originalname);
  }
});

const uploads = multer({
  storage: storage
})

// show all posts
const allPosts = async(request, response) => {
  try {
    const posts = await Post.find();
    if(posts) {
      return response.status(200).render('posts', { posts: posts, title: 'Posts' });
    } else {
      return response.status(400).json({ message: 'No Posts Found..' })
    }
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).json({ message: 'Server Under Maintainance..' })
  }
};

// create post
const createPost = async(request, response) => {
  try {
    const post = new Post({
      title: request.body.title,
      content: request.body.content,
      image: request.file.filename,
      author: request.body.author,
    });
    post.save()
      .then(() => { response.json({ post }); })
      .catch(err => { console.log({ message: err.message }) })

  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).json({ message: 'Server Under Maintainance..' })
  }
};

// edit post
const editPost = async(request, response) => {
  try {
    const id = request.params.id;
    const updateContent = {
      title: request.body.title,
      content: request.body.content,
      image: request.file.filename,
      author: request.body.author, 
    };
    const updated = await Post.findByIdAndUpdate(id, { $set: updateContent });
    if(updated) {
      return response.status(200).json({ message: 'Post Updated Successfully..' })
    } else {
      return response.status(400).json({ message: 'Post Update Failure..' })
    }
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).json({ message: 'Server Under Maintainance..' })
  }
};

// delete post.
const deletePostPage = async (request, response) => {
  const id = request.params.id;
  const post = Post.findById(id);
  return response.status(200).render('delete', { post: post, title: 'Delete Post' } )
};

// delete post.
const deletePost = async (request, response) => {
  try {
    const id = request.params.id;
    const deleted = await Post.findByIdAndDelete(id);
    if(deleted) {
      return response.status(200).send('Post Deleted Successfully..')
    } else {
      return response.status(400).send('Post Not Deleted or Not Found..')
    }
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).send('Server Under Maintainance..')
  }
};


// =================================================
module.exports = {
  welcome,
  uploads,
  allPosts,
  createPost,
  editPost,
  deletePostPage,
  deletePost
}