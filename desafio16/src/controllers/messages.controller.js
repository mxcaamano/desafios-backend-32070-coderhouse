const Contenedor = require('../containers/contenedor')
const contenedor = new Contenedor('./src/db/messages.txt')
const userModel = require('../models/user.model');
// const messagesModel = require("../db/models/messages.models")
const logger = require('../utils/logger')

const getMessages = async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await userModel.findOne({_id: id});
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.render('pages/messages', {name: user.name, email: user.email, imgURL: user.imgURL});
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