const { Router } = require("express")
const { createCart, deleteCart, getCart, updateCart, deleteCartProduct, sendCart } = require("../controllers/carts.controller")

const routerCarts = Router()

// routerCarts.post('/', createCart)
routerCarts.delete('/', deleteCart)
routerCarts.get('/', getCart, createCart)
routerCarts.put('/', updateCart)
routerCarts.delete('/:id/productos/:id_prod', deleteCartProduct)
routerCarts.post('/', sendCart)
// routerCarts.post('/', createCart)
// routerCarts.delete('/:id', deleteCart)
// routerCarts.get('/:id/productos', getCart)
// routerCarts.put('/:id/productos', updateCart)

module.exports = routerCarts