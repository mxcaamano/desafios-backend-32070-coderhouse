const { Router } = require("express")
const getLogout = require('../controllers/logout.controller')

const routerLogout = Router();

routerLogout.get('/', getLogout);

module.exports = routerLogout

