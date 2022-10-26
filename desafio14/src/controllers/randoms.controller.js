const { fork } = require('child_process')
const logger = require('../utils/logger')

const getRandoms = (req, res) => {
    try {
      logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
      let { cant } = req.params;
      if (!cant) {
          cant = 100000000   
      }
      const randoms = fork('./src/controllers/randoms.child.js');
      randoms.send(cant);
      randoms.on('message', (msg) => {
        res.json({ msg });
      });
    } catch (err) {
      console.log(err);
    }
};

module.exports = getRandoms
