const { Router } = require("express")
const { getTestProds } = require('../controllers/test.controller')

const routerTest = Router()

routerTest.get('/', getTestProds)

module.exports = routerTest