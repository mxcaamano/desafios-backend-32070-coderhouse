const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb')
const logger = require('../../utils/logger')

class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('carts', {
            email: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            products: {
                type: Array,
                required: true,
                min: 0
            },
            timestamp: {
                type: Number,
                required: true,
                min: 0
            },
        })
    }
    async getByEmail(email){
        try {
            const found = await this.coll.findOne({email: email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CarritosDaoMongoDb