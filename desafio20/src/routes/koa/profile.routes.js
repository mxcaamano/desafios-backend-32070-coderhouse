const Router = require('koa-router');
const router = new Router();
const getProfile = require('../../controllers/koa/profile.controller');
const { authMiddleware } = require('../../middlewares/middlewaresKoa');

router.get('/profile', authMiddleware, getProfile);

module.exports = router;