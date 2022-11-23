const userModel = require('../models/user.model');
const logger = require('../utils/logger');

const getProfile = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.render('pages/profile', { email: user.email, name: user.name, address: user.address, age: user.age, phone: user.phone, imgURL: user.imgURL })
}

module.exports = getProfile