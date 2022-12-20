const userModel = require('../../models/user.model');
const logger = require('../../utils/logger');

const getProfile = async (ctx) => {
    const user = await userModel.findOne({_id: ctx.req.user});
    logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
    await ctx.render('pages/profile', { email: user.email, name: user.name, address: user.address, age: user.age, phone: user.phone, imgURL: user.imgURL })
}

module.exports = getProfile