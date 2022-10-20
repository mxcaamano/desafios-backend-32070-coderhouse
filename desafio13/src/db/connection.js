const mongoose = require('mongoose')
const config = require('../../config')

const connectMongo = async () => {
    try {
        const url = config.DBURL
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectMongo