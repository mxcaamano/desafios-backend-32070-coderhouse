const logger = require('../../utils/logger')
const cookies = ['koa.sess', 'koa.sess.sig']

const getLogout = (ctx) => {
    try {
        logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
        cookies.forEach(e => {ctx.cookies.set(e,'')})
        return ctx.redirect('/login');
      } catch (err) {
        ctx.body = { message: err.message }
      }
};

module.exports = getLogout