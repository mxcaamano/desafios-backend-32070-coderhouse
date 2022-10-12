const express = require('express');
const app = express();
const { Server: IOServer } = require('socket.io');
require('dotenv').config();
const config = require('./config')

// Sesiones, cookies y Passport
const passport = require('passport');
require('./src/utils/passport.config');
const cookieParser = require('cookie-parser');
app.use(cookieParser(config.SECRET))
const session = require('express-session');

console.log(config.SECRET)
//Persistencia de Sesion
app.use(
    session({
      secret: config.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 100000,
      },
    })
  );

//Conexion DB 
const connectMongo = require('./src/db/connection');
connectMongo()

//Rutas
const routerMsgs = require('./src/routes/messages.router');
const routerLogin = require('./src/routes/login.router');
const routerLogout = require('./src/routes/logout.router');
const routerSignUp = require('./src/routes/signUp.router');
const routerInfo = require('./src/routes/info.router')

//Contenedores
const Contenedor = require('./src/containers/contenedor');
const { SECRET } = require('./config');
const contenedorChats = new Contenedor('./src/db/messages.txt')

//Server
const PORT = config.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
const io = new IOServer(server)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/mensajes', routerMsgs);
app.use('/login', routerLogin);
app.use('/logout', routerLogout);
app.use('/signUp', routerSignUp);
app.use('/info', routerInfo);

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