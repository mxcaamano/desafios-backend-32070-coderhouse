const { Router } = require("express")
const {deleteMessages, getMessages, postMessage} = require('../controllers/messages.controller')
// const { authMiddleware } = require('../middlewares/middlewares');

const routerMsgs = Router()

routerMsgs.get('/', getMessages)
routerMsgs.post('/', postMessage)
routerMsgs.delete('/', deleteMessages)
// routerMsgs.get('/', authMiddleware, getMessages)
// routerMsgs.post('/', authMiddleware, postMessage)
// routerMsgs.delete('/', authMiddleware, deleteMessages)

module.exports = routerMsgs