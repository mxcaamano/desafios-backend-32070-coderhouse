const Router = require('express')
const router = Router();
const routerProducts = require('./products.router');
const routerCarts = require('./carts.router');
const routerMsgs = require('./messages.router');
const routerLogin = require('./login.router');
const routerLogout = require('./logout.router');
const routerSignUp = require('./signUp.router');
// const { routerInfo } = require('./info.router');
const routerProfile = require('./profile.router');
const logger = require('../utils/logger');
const { authMiddleware } = require('../middlewares/middlewares');

router.use('/productos', authMiddleware, routerProducts);
router.get('/', (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.redirect('/productos')
});
router.use('/carrito', authMiddleware, routerCarts);
router.use('/chat', authMiddleware, routerMsgs);
router.use('/login', routerLogin);
router.use('/logout', routerLogout);
router.use('/signUp', routerSignUp);
// router.use('/info', authMiddleware, routerInfo);
router.use('/profile', authMiddleware, routerProfile);
router.get("*", authMiddleware, (req, res) => {
  logger.warn(`La ruta ${req.path} ${req.method} no está implementada`);
  res.render('pages/404error')
  // res.status(404).json({message: `La ruta ${req.method} ${req.url} no está implementada`})
})

module.exports = router


