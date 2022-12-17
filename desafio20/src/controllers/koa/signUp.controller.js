const logger = require('../../utils/logger');

const getSignUp = async (ctx) => {
  logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
  await ctx.render('pages/signUp');
};

const getFailsignUp = async (ctx) => {
  logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
  await ctx.render('pages/signUpError');
}

module.exports = { getSignUp, getFailsignUp };