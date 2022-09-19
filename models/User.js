// =================================================
const mongoose = require('mongoose');

// =================================================
const userSchema = new mongoose.Schema({

  full_names: {
    type: 'string',
    required: true
  },
  username: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  image: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },

}, { timestamps: true });

const User = mongoose.model("users", userSchema);
module.exports = User;