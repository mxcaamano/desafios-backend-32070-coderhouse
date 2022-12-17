const businessCarts = require('../../business/businessCarts')
const containerCarts = businessCarts
const { containerProds } = require('../../controllers/products.controller');
const userModel = require('../../models/user.model');
const logger = require('../../utils/logger')

//nodemailer
const mail = process.env.TEST_MAIL
const transporter = require('../../utils/nodemailer.config')

//twilio
// const sendMsg = require('../../utils/twilio.config')

const createCart = async (ctx) => {
    // const user = await userModel.findOne({_id: ctx.request.session.passport.user});
    // const cart = await containerCarts.getByEmail(user.email)
    const cart = await containerCarts.getByEmail("mcaamano@deercrypto.com")
    if(cart){
        logger.info("El carrito ya existe")
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        logger.info("Carrito creado")
    }
}

const deleteCart = async (ctx) => {
    const { id_cart } = ctx.request.body
    const cart = await containerCarts.getById(id_cart)
    cart && (await containerCarts.deleteById(cart.id), ctx.redirect('/carrito'))
    // cart
    // ? (await containerCarts.deleteById(cart.id), 
    // res.redirect('/carrito'))
    // res.status(200).json({ message: 'Carrito eliminado' }))
    // : res.status(400).json({ message: 'El carrito no existe' })
}

const getCart = async (ctx) => {
    logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
    // const user = await userModel.findOne({_id: ctx.request.session.passport.user});
    // const cart = await containerCarts.getByEmail(user.email)
    const cart = await containerCarts.getByEmail("mcaamano@deercrypto.com")
    if(cart){
        state = true;
        const qtyItems = cart.products.reduce((prev, curr) => prev + curr.qty, 0);
        const total = cart.products.reduce((prev, curr) => prev + curr.qty * curr.price, 0);
        // ctx.body = {list: cart.products, total: total, qtyItems: qtyItems, id_cart: cart.id}
        await ctx.render('pages/cart', {list: cart.products, total: total, qtyItems: qtyItems, id_cart: cart.id})
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        // ctx.body = {list: cart.products}
        await ctx.render('pages/cart', {list: cart.products})
    }
}

const updateCart = async (ctx) => {
    const { id_prod, qty } = ctx.request.body
    // const user = await userModel.findOne({_id: ctx.request.session.passport.user});
    await createCart(ctx)
    // let cart = await containerCarts.getByEmail(user.email);
    let cart = await containerCarts.getByEmail("mcaamano@deercrypto.com")
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
        // res.status(200).json({ message: 'Producto añadido al carrito' })
        ctx.redirect('/carrito')
    }
    else{
        // res.status(400).json({ message: 'El producto no existe' })
        ctx.body = { message: 'El producto no existe' }
    }
}

const deleteCartProduct = async (ctx) => {
    const id = ctx.request.params.id
    const id_prod = ctx.request.params.id_prod
    const cart = await containerCarts.getById(id)
    const product = cart.products.find(p => p._id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    // res.status(200).json({ message: 'Producto eliminado del carrito' })
    // res.json(await containerCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr}))
    ctx.body = await containerCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr})
    }
    else{
        ctx.body = { message: 'El producto seleccionado no existe en el carrito' }
        // res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
    }
}

const sendCart = async (ctx) => {
    const { id_cart, total } = ctx.request.body
    // const user = await userModel.findOne({_id: ctx.request.session.passport.user});
    // const cart = await containerCarts.getByEmail(user.email)
    const cart = await containerCarts.getByEmail("mcaamano@deercrypto.com")
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
    // await sendMsg(`Hola ${user.name}!, tu pedido N° ${cart.timestamp} fue recibido y se encuentra en proceso!`,'+14793365162',process.env.PHONE)
    // await sendMsg(`Pedido de ${user.name}\n ${arrayItemsMsg}\n Total: ${total} U$S `,'whatsapp:+14155238886',`whatsapp:${process.env.WHATSAPP_PHONE}`)
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