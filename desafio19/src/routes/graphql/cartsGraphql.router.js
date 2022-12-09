// const { Router } = require("express")
const { createCart, deleteCart, getCart, updateCart, deleteCartProduct } = require("../../controllers/graphql/cartsGraphql.controller")
const cartsSchema = require('./schema/carts.schema')
// const routerCartsGraphql = Router()

// routerCartsGraphql.delete('/', deleteCart)
// routerCartsGraphql.get('/', getCart, createCart)
// routerCartsGraphql.put('/', updateCart)
// routerCartsGraphql.delete('/:id/productos/:id_prod', deleteCartProduct)
// routerCartsGraphql.post('/', sendCart)

cartsGraphql = {
    createCart: createCart,
    deleteCart: deleteCart,
    getCart: getCart,
    updateCart: updateCart,
    deleteCartProduct: deleteCartProduct
}

routerCartsGraphql = {
    schema: cartsSchema,
    rootValue: cartsGraphql,
    graphiql: true
}

module.exports = routerCartsGraphql