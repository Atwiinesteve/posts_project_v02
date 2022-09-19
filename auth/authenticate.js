// importing modules.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// authenticate a user upon login into dashboard.
/**
 * 
 * @param { *DataInput } request for data to server
 * @param { *DataResponse } response for the data from server
 * @param { *next } do the next thing
 * @returns 
 */
function checkUser(request, response, next) {
 try {
  const token = request.cookies.token;
  if(token) {
   jwt.verify(token, process.env.TOKEN, async(error, decodedID) => {
    if(!error) {
     const user = await User.findById(decodedID._id);
     response.locals.user = user;
     next();
    } else {
     response.locals.user = null;
     next();
    }
   })
  } else {
   response.locals.user = null;
   next();
  }
 } catch (error) {
  console.log({ name: error.name, message: error.message, stack: error.stack });
 }
};



/**
 * 
 * @param { *DataInput } request for data to server
 * @param { *DataResponse } response for the data from server
 * @param { *next } do the next thing
 * @returns 
 */
function auth(request, response, next) {
 const token = request.cookies.token;
 if(!token) {
   response.redirect("/api/login/user");
 } else {
   jwt.verify(token, process.env.TOKEN, (error) => {
     if(!error) {
       next();
     } else {
       response.redirect("/api/login/user");
       console.log({ message: error.message });
     }
   })
 }
}

// exorting auth function.
module.exports = { checkUser, auth };