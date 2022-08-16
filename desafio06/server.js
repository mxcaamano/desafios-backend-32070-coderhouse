const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Router } = express;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt');
const app = express();
const routerProductos = Router();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
const io = new IOServer(server)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use('/api/productos', routerProductos);
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: false}));

// Endpoints
routerProductos.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    let state = null
    productos ? state = true : state = false
    res.render('pages/index', {listExist: state, list: productos} );
})

// routerProductos.get('/add', async(req, res) => {
//     res.render('pages/form');
// })

// routerProductos.get('/:id', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const producto = await contenedor.getById(id)
//     producto 
//     ? res.json(producto) 
//     : res.status(400).json({ error: 'No se encuentra el producto' });
// })

// routerProductos.post('/', async (req, res) => {
//     const producto = req.body;
//     producto.title && producto.price && producto.thumbnail
//     ? (producto.price = parseFloat(producto.price), res.json(await contenedor.save(producto)))
//     : res.status(400).json({ error: 'Se requiere titulo, precio y url de imagen' });
// })

// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const { title, price, thumbnail } = req.body
//     title && price && thumbnail 
//     ? res.json(await contenedor.updateById({title, price, thumbnail, id: parseInt(id)}))
//     : res.status(400).json({ error: 'Se requiere titulo, precio y url de imagen' });
// })

// routerProductos.delete('/:id', async(req, res) => {
//     await contenedor.deleteById(parseInt(req.params.id))
// })

//WebSockets

io.on('connection', async socket => {
    const products = await contenedor.getAll();
    // const chats = [{from:'support@example.com', text:'hola, en que puedo ayudarte?', date: Date() }]
    
    console.log('New user connected: ', socket.id)

    const message = {
        id: socket.id,
        message: 'Welcome to the app',
        products
    }

    socket.on('add-product', async product => {
        products.push(product)
        await contenedor.save(product)
        io.sockets.emit('message-server', message)
    })
    
    socket.emit('message-server', message)

    // const chatMsg = {
    //     id: socket.id,
    //     chats
    //   }
    //   socket.on('add-msg', data => {
    //     const msg = {...data, date: Date()}
    //     chats.push(msg)
    //     io.sockets.emit( 'arrMsg' ,chatMsg)
    //   })
    //   socket.emit('arrMsg', chatMsg)

    socket.on('disconnect', () => {
        console.log('usuario desconectado: ', socket.id)
    })
})