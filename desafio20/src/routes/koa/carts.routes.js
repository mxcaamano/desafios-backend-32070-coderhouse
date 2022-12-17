const Router = require('koa-router');
const router = new Router();
const { deleteCart, getCart, createCart, updateCart, deleteCartProduct, sendCart } = require('../../controllers/koa/carts.controller')

router.delete('/carrito', deleteCart)
router.get('/carrito', getCart, createCart)
router.put('/carrito', updateCart)
router.delete('/carrito/:id/productos/:id_prod', deleteCartProduct)
router.post('/carrito', sendCart)

module.exports = router