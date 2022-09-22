const { normalize, schema } = require("normalizr")
const Contenedor = require('../containers/contenedor')
const contenedor = new Contenedor('./src/db/messages.txt')
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
    const normalizedMsgs = normalize(Msgs, messageSchema)
    console.log(`Sin normalizar ${JSON.stringify(Msgs).length} caracteres`)
    console.log(`Normalizado ${JSON.stringify(normalizedMsgs).length} caracteres`)
    const compPerc = ((1-JSON.stringify(normalizedMsgs).length/JSON.stringify(Msgs).length)*100).toFixed(0)
    console.log(`Porcentaje de compresion: ${compPerc}%`)
    // res.status(200).json(normalizedMsgs)
    res.render('pages/index', {compression: compPerc});
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