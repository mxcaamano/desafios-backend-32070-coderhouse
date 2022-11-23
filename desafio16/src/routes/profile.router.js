const { Router } = require("express")
const routerProfile = Router();
const getProfile = require('../controllers/profile.controller')

routerProfile.get('/', getProfile);

module.exports = routerProfile