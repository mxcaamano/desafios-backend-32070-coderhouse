const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  age: String,
  phone: String,
  imgURL: String
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;