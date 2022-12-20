const Router = require('koa-router');
const router = new Router();
const { deleteCart, getCart, createCart, updateCart, deleteCartProduct, sendCart } = require('../../controllers/koa/carts.controller')
const { authMiddleware } = require('../../middlewares/middlewaresKoa');

router.delete('/carrito', authMiddleware, deleteCart)
router.get('/carrito', authMiddleware, getCart, createCart)
router.put('/carrito', authMiddleware, updateCart)
router.delete('/carrito/:id/productos/:id_prod', authMiddleware, deleteCartProduct)
// router.post('/carrito', authMiddleware, sendCart)

module.exports = router