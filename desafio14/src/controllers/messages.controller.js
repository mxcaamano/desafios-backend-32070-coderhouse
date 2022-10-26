const { normalize, schema } = require("normalizr")
const Contenedor = require('../containers/contenedor')
const contenedor = new Contenedor('./src/db/messages.txt')
const userModel = require('../models/user.model');
// const messagesModel = require("../db/models/messages.models")
const logger = require('../utils/logger')

const getMessages = async (req, res) => {
  const authorSchema = new schema.Entity('author', {} ,{ idAttribute: 'id' })
  const commentSchema = new schema.Entity('contents')
  const messageSchema = [{
    author: authorSchema,
    contents: commentSchema
  }]

  try {
    const id = req.session.passport.user
    const user = await userModel.findOne({_id: id});
    const Msgs = await contenedor.getAll()
    const normalizedMsgs = normalize(Msgs, messageSchema)
    const compPerc = ((1-JSON.stringify(normalizedMsgs).length/JSON.stringify(Msgs).length)*100).toFixed(0)
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    // res.status(200).json(normalizedMsgs)
    res.render('pages/index', {compression: compPerc, user: user.email});
  } catch(error){
    logger.error(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(401).json({error: error.message})
  }
}

const postMessage = async (req, res) => {
  try {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const obj = req.body
    await contenedor.save(obj)
    res.status(200).json({message: "Mensaje enviado"})
  } catch(error){
    logger.error(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(404).json({error: error.message})
  }
}

const deleteMessages = async (req, res) => {
  try {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    await contenedor.deleteAll()
    res.status(200).json({message: 'Mensajes eliminados'})
  } catch(error){
    logger.error(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(404).json({error: error.message})
  }
}

module.exports = { getMessages, postMessage, deleteMessages }