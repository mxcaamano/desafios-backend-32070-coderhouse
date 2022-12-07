const { Router } = require("express")
const { createCart, deleteCart, getCart, updateCart, deleteCartProduct, sendCart } = require("../../controllers/graphql/cartsGraphql.controller")

const routerCartsGraphql = Router()

// routerCartsGraphql.post('/', createCart)
routerCartsGraphql.delete('/', deleteCart)
routerCartsGraphql.get('/', getCart, createCart)
routerCartsGraphql.put('/', updateCart)
routerCartsGraphql.delete('/:id/productos/:id_prod', deleteCartProduct)
routerCartsGraphql.post('/', sendCart)
// routerCartsGraphql.post('/', createCart)
// routerCartsGraphql.delete('/:id', deleteCart)
// routerCartsGraphql.get('/:id/productos', getCart)
// routerCartsGraphql.put('/:id/productos', updateCart)

module.exports = routerCartsGraphql