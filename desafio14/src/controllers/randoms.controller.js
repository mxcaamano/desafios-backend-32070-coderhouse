// const { fork } = require('child_process')
const logger = require('../utils/logger')

const getRandoms = (req, res) => {
    try {
      logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
      let { cant } = req.params;
      if (!cant) {
          cant = 100000000   
      }
      let sum = [];
      for (let i=0; i<cant; i++) {
        sum.push(Math.floor(Math.random() * 999));
      }
      const num = {}
      sum.forEach(e => (num[e] = num[e] + 1 || 1))
      res.status(200).json({ num })
      // const randoms = fork('./src/controllers/randoms.child.js');
      // randoms.send(cant);
      // randoms.on('message', (msg) => {
      //   res.json({ msg });
      // });
    } catch (err) {
      console.log(err);
    }
};

module.exports = getRandoms
