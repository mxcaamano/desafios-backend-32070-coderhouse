const userModel = require('../models/user.model');

const userMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser)
  return next();
  res.redirect('/signup/error');
};

const authMiddleware = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/login')
};

module.exports = { userMiddleware, authMiddleware };