const Router = require('koa-router');
const router = new Router();
const getLogout = require('../../controllers/koa/logout.controller')

router.get('/logout', getLogout);

module.exports = router
