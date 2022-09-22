const io = require('./server')

io.on('connection', async socket => {
    const products = await contenedor.getAll();
    const chat = await contenedorChats.getAll();
    
    console.log('New user connected: ', socket.id)

    const message = {
        id: socket.id,
        message: 'Welcome to the app',
        products
    }

    socket.on('add-product', async product => {
        products.push(product)
        await contenedorProds.save(product)
        io.sockets.emit('message-server', message)
    })
    
    socket.emit('message-server', message)

    const chatMsg = {
        id: socket.id,
        chat
      }
      socket.on('add-msg', async data => {
        const msg = {...data, date: formatDate(new Date())}
        chat.push(msg)
        await contenedorChats.save(msg)
        io.sockets.emit( 'arrMsg' ,chatMsg)
      })
      socket.emit('arrMsg', chatMsg)

    socket.on('disconnect', () => {
        console.log('usuario desconectado: ', socket.id)
    })
})

module.exports = io