// =================================================
const { application } = require('express');
const express = require('express');

// =================================================
const router = express.Router();

// =================================================
const  { 
  welcome,
  storeImage,
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  logoutUser,
  dashboardPage
} = require("../controllers/users");

// import auths.
const { auth, checkUser } = require('../auth/authenticate');



// ============================
// ====== API GET METHOD ======
// ============================
router.get('*', checkUser);
router.get('/home', welcome);
router.get('/register/user', registerPage)
router.get('/login/user', loginPage)
router.get('/dashboard', auth, dashboardPage);
router.get('/logout', logoutUser)



// ============================
// ===== API POST METHOD ======
// ============================
router.post("/register/user", storeImage.single('image'), registerUser);
router.post("/login/user", loginUser);



// ============================
// ===== API PUT METHOD ======
// ============================



// ============================
// ==== API DELETE METHOD =====
// ============================





// Exports.
module.exports = router;