const ContenedorArchivo = require('../../containers/ContenedorArchivo')

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/products.txt')
    }
}

module.exports = ProductosDaoArchivo