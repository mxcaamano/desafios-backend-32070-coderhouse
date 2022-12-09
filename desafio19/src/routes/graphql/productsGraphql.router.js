const { getProducts, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../../controllers/graphql/productsGraphql.controller')
const productsSchema = require('./schema/products.schema')

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