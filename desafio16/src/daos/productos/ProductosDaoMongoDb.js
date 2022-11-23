const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const logger = require('../../utils/logger')

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('products', {
            title: {
                type: String,
                required: true,
                max: 200,
                unique: true
            },
            price: {
                type: Number,
                required: true,
                min: 1
            },
            description: {
                type: String,
                required: true
            },
            thumbnail: {
                type: String,
                required: true,
                trim: true,
            },
            code: {
                type: String,
                required: true,
                trim: true,
            },
            stock: {
                type: Number,
                required: true,
                min: 0
            },
            timestamp: {
                type: Number,
                required: true,
                min: 0
            }
        })
    }
    async getNative(id){
        try {
            const found = await (await this.coll.findOne({_id: id}, {__v: 0})).toObject();
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ProductosDaoMongoDb
