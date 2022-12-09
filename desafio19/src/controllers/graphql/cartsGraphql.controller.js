//DAO MongoDB
// const CarritosDaoMongoDb = require('../daos/carritos/CarritosDaoMongoDb');
// const containerCarts = new CarritosDaoMongoDb();

const businessCarts = require('../../business/businessCarts')
const containerCarts = businessCarts
const { containerProds } = require('../products.controller');
const logger = require('../../utils/logger');
const crypto = require('crypto')

const createCart = async ({data}) => {
    logger.info(`Ruta: createCart, Método: POST`)
    const { email, address } = data
    const cart = await containerCarts.getByEmail(email)
    if(cart){
        return logger.info("El carrito ya existe")
    }
    else{
        const cart = {email: email, address: address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        logger.info("Carrito creado")
        return cart
    }
}

const deleteCart = async ({id}) => {
    logger.info(`Ruta: deleteCart, Método: DELETE`)
    const cart = await containerCarts.getById(id)
    return cart
    && (await containerCarts.deleteById(cart.id))
}

const getCart = async ({email}) => {
    logger.info(`Ruta: getCart, Método: GET`)
    let cart = await containerCarts.getByEmail(email)
    if(cart){
        return cart
    }
    else{
        const cart = {email: email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        return cart
    }
}

const updateCart = async ({dataProd, data}) => {
    logger.info(`Ruta: updateCart, Método: PUT`)
    const { id_prod, qty } = dataProd
    const { email, address } = data
    await createCart({data})
    let cart = await containerCarts.getByEmail(email);
    let product = null
    process.env.DATABASE === 'file' 
    ? product = await containerProds.getById(id_prod)
    : product = await containerProds.getNative(id_prod)
    if(product){
        product._id = id_prod
        product.id = crypto.randomBytes(10).toString('hex');
        product.qty = parseInt(qty)
        cart.products.push(product)
        await containerCarts.updateById(cart.id, {products: cart.products, timestamp: cart.timestamp})
        return cart
    }
}

const deleteCartProduct = async ({id, id_prod}) => {
    const cart = await containerCarts.getById(id)
    const product = cart.products.find(p => p.id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    cart.products = productsArr
    logger.info("Producto eliminado del carrito")
    await containerCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr})
    return cart
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
    deleteCartProduct
}