const passport = require('passport');

const getLogin = (req, res) => {
    res.render('pages/login');
};

const postLogin = (req, res) => {
  passport.authenticate('login', {
    successRedirect: '/api/mensajes',
    failureRedirect: '/login-error',
    passReqToCallback: true,
  })
};

const getFailLogin = (req, res) => {
  res.render('pages/loginError')
}
  
module.exports = { getLogin, postLogin, getFailLogin };