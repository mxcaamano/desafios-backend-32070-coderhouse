const express = require('express')
const { Router } = express
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt');
const app = express();
const routerProductos = Router();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

app.use('/', express.static('public'));

app.use('/api/productos', routerProductos);
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: false}));

routerProductos.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    res.send( productos );
})

routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    res.json(await contenedor.getById(id));
    // .then(data => { res.json(data) })
    // .catch(err => { res.status(500).json(err)})
})

routerProductos.post('/', async (req, res) => {
    console.log(req.body)
    const producto = req.body;
    producto.price = parseFloat(producto.price)
    res.json(await contenedor.save(producto))
})

// routerProductos.put('/:id', (req, res) => {
//     contenedor.
// })

routerProductos.delete('/:id', async(req, res) => {
    await contenedor.deleteById(parseInt(req.params.id))
})