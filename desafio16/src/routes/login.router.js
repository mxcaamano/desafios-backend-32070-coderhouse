const { Router } = require("express")
const passport = require('passport');
const { getLogin, getFailLogin } = require('../controllers/login.controller');

const routerLogin = Router();

routerLogin.get('/', getLogin);
routerLogin.post('/', passport.authenticate('login',{
    successRedirect: '/productos',
    failureRedirect: '/login/error',
    passReqToCallback: true,
  }));
routerLogin.get('/error', getFailLogin);

module.exports = routerLogin;