// ========================================
const jwt = require("jsonwebtoken");



// ========================================
function auth(request, response, next) {
  const token = request.cookies.token;
  if(!token) {
    response.redirect("/login");
  } else {
    jwt.verify(token, process.env.SECRET_TOKEN, (error) => {
      if(!error) {
        next();
      } else {
        response.redirect("/login");
        console.log({ message: error.message });
      }
    })
  }
}



// ========================================
module.exports = { auth };