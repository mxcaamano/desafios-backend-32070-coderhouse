const express = require('express');
const { Server: IOServer } = require('socket.io');
const connectMongo = require('./src/db/connection');
const routerTest = require('./src/routes/test.router');
const routerMsgs = require('./src/routes/messages.router');

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
const io = new IOServer(server)
// connectMongo()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productos-test', routerTest);
app.use('/api/mensajes', routerMsgs);

//WebSockets

// io.on('connection', async socket => {
//     const products = await contenedorProds.getAll();
//     const chat = await contenedorChats.getAll();
    
//     console.log('New user connected: ', socket.id)

//     const message = {
//         id: socket.id,
//         message: 'Welcome to the app',
//         products
//     }

//     socket.on('add-product', async product => {
//         products.push(product)
//         await contenedorProds.save(product)
//         io.sockets.emit('message-server', message)
//     })
    
//     socket.emit('message-server', message)

//     const chatMsg = {
//         id: socket.id,
//         chat
//       }
//       socket.on('add-msg', async data => {
//         const msg = {...data, date: formatDate(new Date())}
//         chat.push(msg)
//         await contenedorChats.save(msg)
//         io.sockets.emit( 'arrMsg' ,chatMsg)
//       })
//       socket.emit('arrMsg', chatMsg)

//     socket.on('disconnect', () => {
//         console.log('usuario desconectado: ', socket.id)
//     })
// })