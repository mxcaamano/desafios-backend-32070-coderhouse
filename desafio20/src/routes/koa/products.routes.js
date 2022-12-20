const Router = require('koa-router');
const router = new Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../../controllers/koa/products.controller')
const { authMiddleware } = require('../../middlewares/middlewaresKoa');

router.get('/productos', authMiddleware,  getProducts)
router.get('/productos/:id', authMiddleware, getProductById)
router.post('/productos', authMiddleware, addProduct)
router.put('/productos/:id', authMiddleware, updateProduct)
router.delete('/productos/:id', authMiddleware, deleteProduct)
router.delete('/productos', authMiddleware, deleteAllProducts)

module.exports = router