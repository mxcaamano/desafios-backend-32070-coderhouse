const passport = require('passport');
const logger = require('../utils/logger')

const getLogin = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.render('pages/login');
};

const postLogin = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  passport.authenticate('login', {
    successRedirect: '/api/mensajes',
    failureRedirect: '/login-error',
    passReqToCallback: true,
  })
};

const getFailLogin = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/loginError')
}
  
module.exports = { getLogin, postLogin, getFailLogin };