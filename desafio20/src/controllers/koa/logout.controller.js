const logger = require('../../utils/logger')

const getLogout = (ctx) => {
    try {
        logger.info(`Ruta: ${ctx.request.url}, Método: ${ctx.request.method}`)
        ctx.session.destroy((err) => {
          // if (err) {
          //   res.status(500).json({ message: err.message});
          // }
          return ctx.redirect('/login');
        });
      } catch (err) {
        // res.status(500).json({ message: err.message });
      }
};

module.exports = getLogout