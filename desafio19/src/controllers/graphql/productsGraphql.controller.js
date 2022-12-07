//DAO MongoDB
// const ProductosDaoMongoDb = require('../daos/productos/ProductosDaoMongoDb')
// const containerProds = new ProductosDaoMongoDb()

const businessProducts = require('../../business/businessProducts')
const containerProds = businessProducts
const logger = require('../../utils/logger')

// Variable de Permisos de Administrador
const isAdmin = true

const getProducts = async () => {
    logger.info(`Ruta: getProducts, Método: GET`)
    const products = await containerProds.getAll();
    return products 
}

const getProductById = async ({id}) => {
    logger.info(`Ruta: getProductById, Método: GET`)
    const product = await containerProds.getById(id)
    return product
}

const addProduct = async ({data}) => {
    if(isAdmin){
        logger.info(`Ruta: addProduct, Método: POST`)
        const product = data;
        return product.title && product.price && !isNaN(product.price) && product.description && product.thumbnail && product.code && product.stock && !isNaN(product.stock)
        && (product.price = parseFloat(product.price), product.timestamp = Date.now(), await containerProds.save(product))
    }
}

const updateProduct = async ({id, data}) => {
    if(isAdmin){
    logger.info(`Ruta: updateProduct, Método: PUT`)
    const { title, price, description, thumbnail, code, stock  } = data
    return title && price && !isNaN(price) && description && thumbnail && code && stock && !isNaN(stock)
    && (await containerProds.updateById(id, {title, price, description, thumbnail, code, stock, timestamp: Date.now()}))
    }
}

const deleteProduct = async ({id}) => {
    if(isAdmin){
    logger.info(`Ruta: deleteProduct, Método: DELETE`)
    const found = await containerProds.getById(id)
    return found
    && await containerProds.deleteById(id)
    }
}

const deleteAllProducts = async () => {
    if(isAdmin){
    logger.info(`Ruta: deleteAllProducts, Método: DELETE`)
    const products = await containerProds.getAll();
    return products 
    && await containerProds.deleteAll();
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    containerProds
}