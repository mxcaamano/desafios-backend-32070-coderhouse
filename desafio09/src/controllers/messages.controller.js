const { normalize, schema } = require("normalizr")
const Contenedor = require('../containers/contenedor')
const contenedor = new Contenedor('./src/db/chats.txt')
// const messagesModel = require("../db/models/messages.models")

const getMessages = async (req, res) => {

  const authorSchema = new schema.Entity('author', {} ,{ idAttribute: 'id' })
  const commentSchema = new schema.Entity('contents')
  const messageSchema = [{
    author: authorSchema,
    contents: commentSchema
  }]

  try {
    const Msgs = await contenedor.getAll()
    console.log(JSON.stringify(Msgs).length)
    const normalizedMsgs = normalize(Msgs, messageSchema)
    console.log(JSON.stringify(normalizedMsgs).length)
    res.status(200).json(normalizedMsgs)
  } catch(error){
    res.status(401).json({error: error.message})
  }
}

const postMessage = async (req, res) => {
  try {
    const obj = req.body
    await contenedor.save(obj)
    res.status(200).json({message: "Mensaje enviado"})
  } catch(error){
    res.status(404).json({error: error.message})
  }
}

const deleteMessages = async (req, res) => {
  try {
    await contenedor.deleteAll()
    res.status(200).json({message: 'Mensajes eliminados'})
  } catch(error){
    res.status(404).json({error: error.message})
  }
}

module.exports = { getMessages, postMessage, deleteMessages }