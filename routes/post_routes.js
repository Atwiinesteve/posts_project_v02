// =================================================
const express = require('express');

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
  deletePostPage
} = require("../controllers/users");

// =================================================

// ============================
// ====== API GET METHOD ======
// ============================

router.get('/home', welcome);
router.get('/all/posts', allPosts);

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