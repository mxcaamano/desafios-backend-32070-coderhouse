// const { Router } = require("express")
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../../controllers/graphql/productsGraphql.controller')
const productsSchema = require('./schema/products.schema')

// const routerProductsGraphql = Router()

// routerProductsGraphql.get('/', getProducts)
// routerProductsGraphql.get('/:id', getProductById)
// routerProductsGraphql.post('/', addProduct)
// routerProductsGraphql.put('/:id', updateProduct)
// routerProductsGraphql.delete('/:id', deleteProduct)
// routerProductsGraphql.delete('/', deleteAllProducts)

productsGraphql = {
    getProducts: getProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    deleteAllProducts: deleteAllProducts
}

routerProductsGraphql = {
    schema: productsSchema,
    rootValue: productsGraphql,
    graphiql: true
}

module.exports = routerProductsGraphql