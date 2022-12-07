const { Router } = require("express")
const routerProfileGraphql = Router();
const getProfile = require('../../controllers/graphql/profileGraphql.controller')

routerProfileGraphql.get('/', getProfile);

module.exports = routerProfileGraphql