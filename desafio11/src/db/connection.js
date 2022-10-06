const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        const url = 'mongodb+srv://admin:admin@cluster0.dbaqnvv.mongodb.net/desafio11?retryWrites=true&w=majority'
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