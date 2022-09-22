const { Router } = require("express")
const {deleteMessages, getMessages, postMessage} = require('../controllers/messages.controller')

const routerMsgs = Router()

routerMsgs.get('/', getMessages)
routerMsgs.post('/', postMessage)
routerMsgs.delete('/', deleteMessages)

module.exports = routerMsgs