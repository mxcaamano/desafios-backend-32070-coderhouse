const { Router } = require("express");
const routerInfo = Router();
const CPUqty = require('os').cpus().length;
const logger = require('../utils/logger')

// routerInfo.get('/', (req, res) => {
//     logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
//     res.status(200).json({
//         argv: process.argv.slice(2),
//         SO: process.platform,
//         version: process.version,
//         memory: process.memoryUsage(),
//         execPath: process.execPath,
//         proyectPath:process.cwd(),
//         processID: process.pid,
//         CPUqty: CPUqty
//     })
// })

routerInfo.get('/', (req, res) => {
        logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const info = {
        argv: process.argv.slice(2),
        SO: process.platform,
        version: process.version,
        memory: process.memoryUsage(),
        execPath: process.execPath,
        proyectPath:process.cwd(),
        processID: process.pid,
        CPUqty: CPUqty
    }
    //Utilizado para probar bloqueante
    // console.log(
    //     `argv: ${info.argv}` + "\n",
    //     `SO: ${info.SO}` + "\n",
    //     `version: ${info.version}` + "\n",
    //     `memory: ${info.memory}` + "\n",
    //     `execPath: ${info.execPath}` + "\n",
    //     `proyectPath: ${info.proyectPath}` + "\n",
    //     `processID: ${info.processID}` + "\n",
    //     `CPUqty: ${info.CPUqty}` + "\n",
    // );
    res.status(200).send(info)
})

module.exports = { routerInfo, CPUqty };