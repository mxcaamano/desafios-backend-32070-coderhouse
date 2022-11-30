const { mongoose } = require("mongoose")

const authorSchema = new mongoose.Schema({
    id: String,
    name: String, 
    lastName: String,
    age: Number,
    alias: String,
    avatar: String
  })
    
  const messageSchema = new mongoose.Schema({
    author: authorSchema,
    text: String,
    __v: { type: Number, select: false}
  }, 
  )
    
  const messagesModel = mongoose.model('messages', messageSchema)

  module.exports = messagesModel