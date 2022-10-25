const { Router } = require("express");
const routerRandoms = Router();
const getRandoms = require('../controllers/randoms.controller');

routerRandoms.get('/', getRandoms);
routerRandoms.get('/:cant', getRandoms);

module.exports = routerRandoms