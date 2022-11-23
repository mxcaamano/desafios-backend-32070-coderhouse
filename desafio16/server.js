const express = require('express');
const app = express();
const { Server: IOServer } = require('socket.io');
require('dotenv').config();
const config = require('./config');
const cluster = require('cluster');
const compression = require('compression')
const logger = require('./src/utils/logger')
const MongoStore =  require('connect-mongo')

// Sesiones, cookies y Passport
const passport = require('passport');
require('./src/utils/passport.config');
const cookieParser = require('cookie-parser');
app.use(cookieParser(config.SECRET))
const session = require('express-session');

//Persistencia de Sesion
app.use(
    session({
      secret: config.SECRET,
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.DBURL, mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true} }),
      cookie: {
        maxAge: 100000,
      },
    })
  );

//Compression con gzip
app.use(compression())

//Conexion DB 
const connectMongo = require('./src/db/connection');
connectMongo()

//Rutas
const routes = require('./src/routes/index.router')
// const routerMsgs = require('./src/routes/messages.router');
// const routerLogin = require('./src/routes/login.router');
// const routerLogout = require('./src/routes/logout.router');
// const routerSignUp = require('./src/routes/signUp.router');
// const { routerInfo } = require('./src/routes/info.router')
// const routerRandoms = require('./src/routes/randoms.router')
const methodOverride = require("method-override")
app.use(methodOverride('_method'))

//Contenedores
const Contenedor = require('./src/containers/contenedor');
const contenedorChats = new Contenedor('./src/db/messages.txt')

//Server
let server
const PORT = process.env.PORT || config.PORT;
const MODE = process.env.MODE || config.MODE;
const { CPUqty } = require('./src/routes/info.router');

if(MODE === 'cluster' && cluster.isPrimary){
    logger.info(PORT, MODE);
    logger.info(`Master ${process.pid} is running`);
    for (let i = 0; i < CPUqty ; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
    });
  }   
else {
    server = app.listen(PORT, () =>{
    logger.info(`Port: ${PORT}, Mode: ${MODE}`)
    MODE === 'cluster' && logger.info(`Worker ${process.pid} started`)
    })
  }
// const server = app.listen(PORT, ()=>{
//   console.log(`Escuchando en el puerto ${server.address().port}`)
// })
const io = new IOServer(server)

//App

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

// app.use('/chat', routerMsgs);
// app.use('/login', routerLogin);
// app.use('/logout', routerLogout);
// app.use('/signUp', routerSignUp);
// app.use('/info', routerInfo);
// app.get("*", (req, res) => {
//   logger.warn(`La ruta ${req.path} ${req.method} no está implementada`);
//   res.status(404).json({message: `La ruta ${req.method} ${req.url} no está implementada`})
// })

//WebSockets

io.on('connection', async socket => {
    const chat = await contenedorChats.getAll();
    
    logger.info('New user connected: ', socket.id)

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
        // Guardado deshabilitado, pendientede implementar para la prox. entrega.
        // await contenedorChats.save(msg)
        io.sockets.emit( 'arrMsg' ,chatMsg)
      })
      socket.emit('arrMsg', chatMsg)

    socket.on('disconnect', () => {
        logger.info('usuario desconectado: ', socket.id)
    })
})