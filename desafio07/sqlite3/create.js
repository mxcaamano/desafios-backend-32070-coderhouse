const { options } = require('./conexionDB')

const knex = require('knex')(options)

const create = async (nombreTabla) => {
    try {
        await knex.schema.createTable(nombreTabla, table =>{
            table.increments('id')
            table.string('from')
            table.string('text')
            table.datetime('date')
        })
        console.log('Tabla creada')
    } catch (error) {
        console.log(error)
    }
    finally{
        knex.destroy()
    }
}

create('mensajes')