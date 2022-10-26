const logger = require('../utils/logger')

const getLogout = (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
        req.session.destroy((err) => {
          if (err) {
            res.status(500).json({ message: err.message});
          }
          return res.status(200).redirect('/login');
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

module.exports = getLogout