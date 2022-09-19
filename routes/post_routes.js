// =================================================
const express = require('express');
const { auth, checkUser } = require('../auth/authenticate');

// =================================================
const router = express.Router();

// =================================================
const  { 
  welcome,
  uploads,
  createPost,
  allPosts,
  editPost,
  deletePost,
  deletePostPage,
  createPostPage
} = require("../controllers/posts");

// =================================================

// ============================
// ====== API GET METHOD ======
// ============================

router.get('*', checkUser)
router.get('/home', welcome);
router.get('/all/posts', allPosts);
router.get('/create/post', auth, createPostPage)

// =================================================

// ============================
// ===== API POST METHOD ======
// ============================

router.post("/create/post", uploads.single("image"), createPost);

// =================================================

// ============================
// ===== API PUT METHOD ======
// ============================

router.put("/update/post/:id", uploads.single('image'), editPost);

// =================================================

// ============================
// ==== API DELETE METHOD =====
// ============================
router.get('/delete/post/:id', deletePostPage);
router.delete("/delete/post/:id", deletePost);




// =================================================
module.exports = router;