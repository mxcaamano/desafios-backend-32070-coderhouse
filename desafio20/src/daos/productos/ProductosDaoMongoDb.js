const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const productModel = require('../../models/product.model')
const config = require('../../../config')
const logger = require('../../utils/logger')

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, productModel)
    }
    async getNative(id){
        try {
            const found = await (await this.schema.findOne({_id: id}, {__v: 0})).toObject();
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ProductosDaoMongoDb
