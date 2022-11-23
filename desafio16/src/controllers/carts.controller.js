//DAO MongoDB
const CarritosDaoMongoDb = require('../daos/carritos/CarritosDaoMongoDb');
const containerCarts = new CarritosDaoMongoDb();

const { containerProds } = require('../controllers/products.controller');
const userModel = require('../models/user.model');
const logger = require('../utils/logger')

// Variable de Permisos de Administrador
const isAdmin = true

//nodemailer
const mail = 'shirley99@ethereal.email'
const transporter = require('../utils/nodemailer.config')

//twilio
const sendMsg = require('../utils/twilio.config')

const createCart = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    const cart = await containerCarts.getByEmail(user.email)
    if(cart){
        logger.info("El carrito ya existe")
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        logger.info("Carrito creado")
    }
}

// const createCart = async (req, res) => {
//     const user = await userModel.findOne({_id: req.session.passport.user});
//     const carts = await containerCarts.getAll();
//     if(carts.find(e => e.email == user.email)){
//         res.status(200).json({ message: 'El carrito ya existe' })
//     }
//     else{
//         const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//         cart
//         ? (await containerCarts.save(cart),
//         res.status(200).json({ message: 'Carrito creado' }))
//         : res.status(400).json({ message: 'No se pudo crear el carrito' })
//     }
// }

// const createCart = async (req, res) => {
//     const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//     cart
//     ? (res.status(200).json({ message: 'Carrito creado' }),
//     res.json(await containerCarts.save(cart)))
//     : res.status(400).json({ message: 'No se pudo crear el carrito' })
// }

const deleteCart = async (req, res) => {
    const { id_cart } = req.body
    const cart = await containerCarts.getById(id_cart)
    cart
    ? (await containerCarts.deleteById(cart.id), 
    res.redirect('/carrito'))
    // res.status(200).json({ message: 'Carrito eliminado' }))
    : res.status(400).json({ message: 'El carrito no existe' })
}

// const deleteCart = async (req, res) => {
//     const id = req.params.id
//     const found = await containerCarts.getById(id)
//     found
//     ? (await containerCarts.deleteById(id), 
//     res.status(200).json({ message: 'Carrito eliminado' }))
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const getCart = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const cart = await containerCarts.getByEmail(user.email)
    if(cart){
        state = true;
        const qtyItems = cart.products.reduce((prev, curr) => prev + curr.qty, 0);
        const total = cart.products.reduce((prev, curr) => prev + curr.qty * curr.price, 0);
        res.render('pages/cart', {list: cart.products, total: total, qtyItems: qtyItems, id_cart: cart._id})
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        res.render('pages/cart', {list: cart.products})
    }
}

// const getCart = async (req, res) => {
//     const id = req.params.id
//     const cart = await containerCarts.getById(id)
//     cart
//     ? res.json(cart.products)
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const updateCart = async (req, res) => {
    const { id_prod, qty } = req.body
    const user = await userModel.findOne({_id: req.session.passport.user});
    await createCart(req)
    let cart = await containerCarts.getByEmail(user.email);
    // if(!cart){
    //     cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
    //     await containerCarts.save(cart)
    // }
    const product = await containerProds.getNative(id_prod)
    if(product){
        product._id = id_prod
        product.id = cart.products.length + 1
        product.qty = parseInt(qty)
        cart.products.push(product)
        await containerCarts.updateById(cart._id, {products: cart.products, timestamp: cart.timestamp})
        // res.status(200).json({ message: 'Producto añadido al carrito' })
        res.redirect('/carrito')
    }
    else{
        res.status(400).json({ message: 'El producto no existe' })
    }
}

// const updateCart = async (req, res) => {
//     const id = req.params.id
//     const { id_prod } = req.body
//     const cart = await containerCarts.getById(id)
//     const product = await containerProds.getById(id_prod)
//     product 
//     ? (product._id = cart.products.length + 1, 
//     cart.products.push(product),
//     res.status(200).json({ message: 'Producto añadido al carrito' }),
//     res.json(await containerCarts.updateById(id, {products: cart.products, timestamp: cart.timestamp})))
//     : res.status(400).json({ message: 'El producto no existe' }) 
// }

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

const sendCart = async (req, res) => {
    const { id_cart, total } = req.body
    const user = await userModel.findOne({_id: req.session.passport.user});
    const cart = await containerCarts.getById(id_cart)  
    let arrayItems = "";
    let arrayItemsMsg = "";
    let n;
    for (n in cart.products) {
    arrayItems += `<div style="color: #2bf8bb;">
                        <strong><u><p style="color: #2bf8bb;">${cart.products[n].title}</p></u></strong>            
                        <img src=${cart.products[n].thumbnail} width="50" height="50" style="color: #2bf8bb;" alt="Imagen Producto"/><br>
                        <span style="color: #4eaa93;">Cantidad: ${cart.products[n].qty}</span>
                        <h5 style="color: #4eaa93;">Precio Unitario: ${cart.products[n].price} U$S</h5>
                        <h4 style="color: #2bf8bb;">Total Producto: ${cart.products[n].qty * cart.products[n].price} U$S</h4>
                        <br>
                    </div>`;
    arrayItemsMsg += `
     • ${cart.products[n].title}           
     Cantidad: ${cart.products[n].qty}
     Precio Unitario: ${cart.products[n].price} U$S
     Total Producto: ${cart.products[n].qty * cart.products[n].price} U$S\n`;
    }
    const mailOptions =  {
        from: `${user.email}`,
        to: mail,
        subject: `Nuevo pedido de: ${user.name}`,
        html: `<div style="background-color:black;"><br>
                <h1 style="color: #2bf8bb;">&nbsp&nbsp&nbsp Pedido de ${user.name}:</h1>
                <ul>${arrayItems}</ul>
                <h2 style="color: #2bf8bb;">&nbsp&nbsp&nbspTotal: ${total} U$S</h2><br>
                </div><br>`
    }
    await transporter.sendMail(mailOptions)
    await sendMsg(`Hola ${user.name}!, tu pedido N° ${cart.timestamp} fue recibido y se encuentra en proceso!`,'+14793365162',process.env.PHONE)
    await sendMsg(`Pedido de ${user.name}\n ${arrayItemsMsg}\n Total: ${total} U$S `,'whatsapp:+14155238886',`whatsapp:${process.env.WHATSAPP_PHONE}`)
    await containerCarts.deleteById(id_cart)
    res.redirect('/productos')
    // res.status(200).json({ message: 'Pedido enviado' })
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
    deleteCartProduct,
    sendCart
}