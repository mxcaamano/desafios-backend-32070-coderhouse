const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const { getLogin, postLogin, getFailLogin } = require('../../controllers/koa/login.controller');

router.get('/login', getLogin);
router.post('/login', passport.authenticate('login',{
    successRedirect: '/productos',
    failureRedirect: '/login/error',
    passReqToCallback: true
}));
router.get('/login/error', getFailLogin);

module.exports = router;