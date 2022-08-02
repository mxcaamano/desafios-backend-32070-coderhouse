const fs = require('fs').promises;

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? await fs.writeFile(this.ruta, JSON.stringify([...dataParse, { ...obj, id: dataParse[dataParse.length - 1].id + 1 }], null, 2)) 
            : await fs.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2));
            console.log(`El Producto tiene el ID: ${dataParse.length + 1}`);
        } catch (error) {
            console.log(error)            
        }
        
    }

    async getById(number){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.id === number )
            if (found){
                console.log(found);
                return found
            }
            else{
                console.log("No se encuentra el producto");
                return null;
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            return dataParse.length 
            ? dataParse
            : console.log("No hay productos")
            // dataParse.length 
            // ? console.log(dataParse)
            // : console.log("No hay productos")
        } 
        catch (error) {
            console.log(error);
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
                console.log('Producto eliminado');
            }
            else{
                // return null;
                console.log("No existe el producto");
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? (await fs.writeFile(this.ruta, JSON.stringify([])), console.log(`${dataParse.length} Productos eliminados`)) 
            : console.log("No hay productos para eliminar.")    
        } 
        catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = Contenedor;