// ==========================================
const mongoose = require('mongoose');
require("dotenv").config();



// ==========================================
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
}, error => {
  if(error) {
    console.log({
      message: error.message
    })
  } else {
    console.log({
      message: 'Connection to Database Established Successfully'
    })
  }
});



// ==========================================
module.exports = mongoose;