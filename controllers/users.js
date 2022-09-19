// =================================================
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
require("dotenv").config();



// =================================================
const User = require('../models/User');
const { request } = require('http');
const Post = require('../models/Post');



// =================================================

// ==========================
// ==== API GET FUNCTIONS====
// ==========================

// Welcome page
function welcome(request, response) {
  return response.status(200).render('home', { title: 'Home'});
}

// Register Page.
function registerPage(request, response) {
  return response.status(200).render('register', { title: 'Register' })
};

// Login Page.
function loginPage(request, response) {
  return response.status(200).render('login', { title: 'Login' })
};

// Show Dashboard
async function dashboardPage(request, response) {
  const posts = await Post.find();
  return response.status(200).render('dashboard', { title: 'User Dashboard', posts: posts })
}


// =================================================

// ===========================
// ==== API POST FUNCTIONS====
// ===========================

// upload images.
const imageStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (request, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});
const storeImage = multer({
  storage: imageStorage
})

// create user
const registerUser = async(request, response) => {
  try {
    const userAlreadyExists = await User.findOne({ email: request.body.email });
    if(userAlreadyExists) {
      return response.status(201).render('registeredUser', { title: 'Registered..'})
    } else {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(request.body.password, salt);
      const user = new User({
        full_names: request.body.full_names,
        username: request.body.username,
        email: request.body.email,
        image: request.file.filename,
        password: hash,
      });
      user.save()
        .then(() => { response.status(201).render('createdUser', { title: 'User Created..', message: 'User Created Successfully..' }) })
        .catch(err => { console.log({ message: err.message }) })
    }

  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).render('serverError', { title: 'Server Error..', message: 'Server Shutdoen Error. Please try again Later. Apologies for losses caused..' })
  }
};

// login user.
const loginUser = async(request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if(!user) {
      return response.status(404).render('userNotFound', { title: 'User Not Found..', message: 'User Not Found..' })
    } else {
      const validPassword = await bcrypt.compare(request.body.password, user.password);
      if(!validPassword) {
        return response.status(400).render('invalidPassEmail', { title: 'Invalid..', message: 'Invalid Password / Email..'})
      } else {
        const maxAge = 1*24*60*60;
        const token = jwt.sign({ id: user._id }, process.env.TOKEN, { expiresIn: maxAge });
        response.cookie('token', token, { maxAge: maxAge, httpOnly: true, secure: true, SameSite: true })
        return response.status(200).redirect('/api/dashboard');
      }
    }
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
    return response.status(500).render('serverError', { title: 'Server Error..', message: 'Server Shutdoen Error. Please try again Later. Apologies for losses caused..' })
  }
};

// edit user

// delete user

// user logout
function logoutUser(request, response) {
  response.cookie('token', '', { maxAge: 0.0001 })
  return response.redirect('/login');
}


// =================================================
module.exports = {
  welcome,
  storeImage,
  registerPage,
  dashboardPage,
  registerUser,
  loginPage,
  loginUser,
  logoutUser
}