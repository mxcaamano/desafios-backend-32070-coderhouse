const express = require('express');
const app = express();
const { Server: IOServer } = require('socket.io');

// Sesiones y cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const session = require('express-session');

//Persistencia de Sesion con Mongo
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin@cluster0.dbaqnvv.mongodb.net/desafio10?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: '123456',
    resave: false,
    saveUninitializaed: false,
    cookie: {
        maxAge: 10000,
      },
}))

//Conexion DB 
// const connectMongo = require('./src/db/connection');
// connectMongo()

//Rutas
const routerTest = require('./src/routes/test.router');
const routerMsgs = require('./src/routes/messages.router');
const routerSession = require('./src/routes/session.router')

//Contenedores
const Contenedor = require('./src/containers/contenedor');
const contenedorChats = new Contenedor('./src/db/messages.txt')

//Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
const io = new IOServer(server)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productos-test', routerTest);
app.use('/api/mensajes', routerMsgs);
app.use('/', routerSession)

//WebSockets

io.on('connection', async socket => {
    const chat = await contenedorChats.getAll();
    
    console.log('New user connected: ', socket.id)

    const message = {
        id: socket.id,
        message: 'Welcome to the app',
        chat
    }

    socket.emit('message-server', message)

    const chatMsg = {
        id: socket.id,
        chat
      }
      socket.on('add-msg', async data => {
        // const msg = {...data, date: formatDate(new Date())}
        const msg = data
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