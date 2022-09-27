const { Router } = require('express')
const { logout, login, postLogin } = require('../controllers/session.controller')
const authMiddleware = require('../middlewares/auth.middleware');

const routerSession = Router()

routerSession.post('/login', postLogin)

routerSession.get('/login', authMiddleware, login)

routerSession.get('/logout', logout )

// routerSession.delete('/logout', deLogout )

module.exports = routerSession;