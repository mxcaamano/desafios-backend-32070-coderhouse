const { Router } = require("express")
const {deleteMessages, getMessages, postMessage} = require('../controllers/messages.controller')
const authMiddleware = require('../middlewares/auth.middleware');

const routerMsgs = Router()

routerMsgs.get('/', authMiddleware, getMessages)
routerMsgs.post('/', authMiddleware, postMessage)
routerMsgs.delete('/', authMiddleware, deleteMessages)

module.exports = routerMsgs