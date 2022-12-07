const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb')
const cartModel = require('../../models/cart.model')
const config = require('../../../config')
const logger = require('../../utils/logger')

class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, cartModel)
    }
    async getByEmail(email){
        try {
            const found = await this.schema.findOne({email: email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CarritosDaoMongoDb