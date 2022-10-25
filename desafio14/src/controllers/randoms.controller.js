const { fork } = require('child_process')

const getRandoms = (req, res) => {
    try {
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
