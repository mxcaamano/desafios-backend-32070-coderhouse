const mongoose = require('mongoose')
// const connectMongo = require('../db/mongodb/connection');
// connectMongo();
const logger = require('../utils/logger')

class ContenedorMongoDb {
    constructor(collName, schema){
        this.coll = mongoose.model(collName, schema)
    }

    async save(obj){
        try {
            const created = await this.coll.create(obj)
            return created;
        } catch (error) {
            logger.error(error)            
        }
        
    }

    async getById(id){
        try {
            const found = await this.coll.findOne({_id: id}, {__v: 0});
            return found
            ? (logger.info(found), found)
            : logger.info("No se encuentra el objeto")
        } 
        catch (error) {
            logger.error(error)
        }
    }

    async updateById(id, props){
        try {
            const updated = await this.coll.updateOne({_id: id}, { $set: props })
            logger.info(updated)
        } catch (error) {
            logger.error(error)            
        }
    }

    async getAll(){
        try {
            const found = await this.coll.find();
            return found.length 
            ? found
            // ? (console.log(found), found)
            : logger.info("No hay objetos")
        } 
        catch (error) {
            logger.error(error);
        }
    }

    async deleteById(id){
        try {
            const deleted = await this.coll.deleteOne({_id: id})
            if (deleted.deletedCount > 0){
                logger.info('Objeto eliminado');
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
            const deleted = await this.coll.deleteMany()
            deleted.deletedCount 
            ? logger.info(`${deleted.deletedCount} objetos eliminados`) 
            : logger.info("No hay objetos para eliminar.")    
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = { ContenedorMongoDb }