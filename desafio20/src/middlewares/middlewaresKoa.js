const userModel = require('../models/user.model');

const userMiddleware = async (ctx, next) => {
  const { email } = ctx.request.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser)
  return next();
  ctx.redirect('/signup/error');
};

const authMiddleware = (ctx, next) => {
  ctx.isAuthenticated() ? next() : ctx.redirect('/login')
};

module.exports = { userMiddleware, authMiddleware };