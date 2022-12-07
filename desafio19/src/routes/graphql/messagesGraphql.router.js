const { Router } = require("express")
const {deleteMessages, getMessages, postMessage} = require('../../controllers/graphql/messagesGraphql.controller')
// const { authMiddleware } = require('../../middlewares/middlewares');

const routerMsgsGraphql = Router()

routerMsgsGraphql.get('/', getMessages)
routerMsgsGraphql.post('/', postMessage)
routerMsgsGraphql.delete('/', deleteMessages)
// routerMsgsGraphql.get('/', authMiddleware, getMessages)
// routerMsgsGraphql.post('/', authMiddleware, postMessage)
// routerMsgsGraphql.delete('/', authMiddleware, deleteMessages)

module.exports = routerMsgsGraphql