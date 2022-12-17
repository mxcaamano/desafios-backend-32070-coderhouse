const businessProducts = require('../../business/businessProducts')
const containerProds = businessProducts
const logger = require('../../utils/logger')

// Variable de Permisos de Administrador
const isAdmin = true

const getProducts = async (ctx) => {
    logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
    const products = await containerProds.getAll();
    
    // Render Koa
    let state = null
    products ? state = true : state = false
    await ctx.render('pages/products', {listExist: state, list: products});
    
    // JSON
    // return products 
    // ? res.json(products)
    // : res.status(400).json({ error: 'No se encuentran productos' });
    
    //Koa
    // return products && (ctx.body = products)
}

const getProductById = async (ctx) => {
    logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
    const id = ctx.request.params.id;
    const product = await containerProds.getById(id)
    return product && (ctx.body = product)
    // return product 
    // ? res.json(product) 
    // : res.status(400).json({ error: 'No se encuentra el producto' });
}

const addProduct = async (ctx) => {
    if(isAdmin){
        const product = ctx.request.body;
        product.title && product.price && !isNaN(product.price) && product.description && product.thumbnail && product.code && product.stock && !isNaN(product.stock)
        && (product.price = parseFloat(product.price), product.timestamp = Date.now(), await containerProds.save(product))
    }
}

const updateProduct = async (ctx) => {
    if(isAdmin){
    const { id } = ctx.request.params
    const { title, price, description, thumbnail, code, stock  } = ctx.request.body
    title && price && !isNaN(price) && description && thumbnail && code && stock && !isNaN(stock)
    && (await containerProds.updateById(id, {title, price, description, thumbnail, code, stock, timestamp: Date.now()}))
    }
}

const deleteProduct = async (ctx) => {
    if(isAdmin){
    const id = ctx.request.params.id
    const found = await containerProds.getById(id)
    found && (await containerProds.deleteById(id))
    }
}

const deleteAllProducts = async (ctx) => {
    if(isAdmin){
    await containerProds.deleteAll();
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