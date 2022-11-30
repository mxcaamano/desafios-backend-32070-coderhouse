const mongoose = require('mongoose')
const config = require('../../config')
const logger = require('../utils/logger')

const connectMongo = async () => {
    try {
        const url = config.DBURL
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info('MongoDB connected')
    } catch (error) {
        logger.error(error)
    }
}

module.exports = connectMongo