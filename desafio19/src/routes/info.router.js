const { Router } = require("express");
const routerInfo = Router();
const CPUqty = require('os').cpus().length;
const logger = require('../utils/logger')

routerInfo.get('/', (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(200).json({
        argv: process.argv.slice(2),
        SO: process.platform,
        version: process.version,
        memory: process.memoryUsage(),
        execPath: process.execPath,
        proyectPath:process.cwd(),
        processID: process.pid,
        CPUqty: CPUqty
    })
})

module.exports = { routerInfo, CPUqty };