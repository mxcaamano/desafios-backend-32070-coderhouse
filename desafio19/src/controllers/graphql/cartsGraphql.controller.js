//DAO MongoDB
// const CarritosDaoMongoDb = require('../daos/carritos/CarritosDaoMongoDb');
// const containerCarts = new CarritosDaoMongoDb();

const businessCarts = require('../../business/businessCarts')
const containerCarts = businessCarts
const { containerProds } = require('../products.controller');
const userModel = require('../../models/user.model');
const logger = require('../../utils/logger');

const createCart = async ({data}) => {
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
    const { id_prod, qty } = dataProd
    const { email, address } = data
    await createCart({data})
    let cart = await containerCarts.getByEmail(email);
    let product = null
    process.env.DATABASE === 'file' 
    ? product = await containerProds.getById(id_prod)
    : product = await containerProds.getNative(id_prod)
    console.log(product)
    if(product){
        product._id = id_prod
        product.id = cart.products.length + 1
        product.qty = parseInt(qty)
        cart.products.push(product)
        await containerCarts.updateById(cart.id, {products: cart.products, timestamp: cart.timestamp})
        return cart
    }
}

const deleteCartProduct = async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const cart = await containerCarts.getById(id)
    const product = cart.products.find(p => p._id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    res.status(200).json({ message: 'Producto eliminado del carrito' })
    res.json(await containerCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr}))
    }
    else{
        res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
    deleteCartProduct
}