const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    length: 100,
  },
  email: {
    type: String,
    required: true,
    length: 100,
  },
  password: {
    type: String,
    required: true,
    length: 100,
  },
  role: {
    type: String,
    required: true,
    length: 100,
    default: 'user',
  },
});

const User = mongoose.model('User', userShema);
module.exports = User;
