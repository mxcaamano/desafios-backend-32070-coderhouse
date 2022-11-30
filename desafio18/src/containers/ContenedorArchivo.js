const fs = require('fs').promises;
const logger = require('../utils/logger')
const { v4: uuidv4 } = require('uuid');

class ContenedorArchivo {
    constructor(ruta){
        this.ruta = ruta
    }

    async #readFileFunction(ruta){
        let archivo = await fs.readFile(ruta, 'utf8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async save(obj){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? await fs.writeFile(this.ruta, JSON.stringify([...dataParse, { ...obj }], null, 2)) 
            : await fs.writeFile(this.ruta, JSON.stringify([{...obj, id: uuidv4() }], null, 2));
            logger.info(`Objeto guardado`);
        } catch (error) {
            logger.error(error)            
        }
        
    }

    async getById(number){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.id === number )
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

    async updateById(obj, props){
        try {
            let data = await this.#readFileFunction(this.ruta);
            let found = {...data.find( e => e.id === obj), ...props};
            if(found){
                data = data.filter( e => e.id !== obj);
                data.push(found)
                await fs.writeFile(this.ruta, JSON.stringify(data, null, 2)) 
                logger.info('Objeto actualizado')
            }
            else {
                logger.info('No se encuentra el objeto')
            }
        } catch (error) {
            logger.error(error)            
        }
    }

    async getAll(){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            return dataParse.length 
            ? dataParse
            : logger.info("No hay objetos")
        } 
        catch (error) {
            logger.error(error);
        }
    }

    async deleteById(number){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.id === number )
            if (found){
                let dataParseFilter = dataParse.filter(found => found.id !== number)
                await fs.writeFile(this.ruta, JSON.stringify(dataParseFilter, null, 2), 'utf8')
                logger.info('objeto eliminado');
            }
            else{
                logger.info("No existe el objeto");
            }
            
        } 
        catch (error) {
            logger.error(error)
        }
    }

    async deleteAll(){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? (await fs.writeFile(this.ruta, JSON.stringify([])), logger.info(`${dataParse.length} objetos eliminados`)) 
            : logger.info("No hay objetos para eliminar.")    
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContenedorArchivo;