const express = require('express')
const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt');
const app = express();

app.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll()
    res.send( productos );
})

app.get('/productoRandom', async(req, res) => {
    const productos = await contenedor.getAll()
    const randomProd = Math.floor(Math.random()*productos.length) 
    res.send( productos [randomProd] )
})

const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})