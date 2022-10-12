const Router = require('express');
const { getSignUp, postSignUp, getFailsignUp } = require('../controllers/signUp.controller');
const { userMiddleware } = require('../middlewares/middlewares.js');

const routerSignUp = Router();

routerSignUp.get('/', getSignUp);
routerSignUp.post('/', userMiddleware, postSignUp);
routerSignUp.get('/error', getFailsignUp);

module.exports = routerSignUp;