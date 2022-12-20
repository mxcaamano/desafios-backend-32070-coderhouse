const passport = require('koa-passport');
const logger = require('../../utils/logger')

const getLogin = async (ctx) => {
    logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`);
    await ctx.render('pages/login', { email: process.env.TEST_USER, password: process.env.TEST_PASS });
};

const postLogin = (ctx) => {
  logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`);
  ctx.redirect('/productos');
  passport.authenticate('login', {
    successRedirect: '/productos',
    failureRedirect: '/login-error',
    passReqToCallback: true,
  })
};

const getFailLogin = async (ctx) => {
  logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
  await ctx.render('pages/loginError')
}
  
module.exports = { getLogin, postLogin, getFailLogin };