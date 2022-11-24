const ContenedorArchivo = require('../../containers/ContenedorArchivo')
const fs = require('fs').promises;
const logger = require('../../utils/logger')

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/carts.txt')
    }
    async getByEmail(email){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.email === email )
            if (found){
                logger.info(found);
                return found
            }
            else{
                logger.info("No se encuentra el objeto");
                return null;
            }
            
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CarritosDaoArchivo