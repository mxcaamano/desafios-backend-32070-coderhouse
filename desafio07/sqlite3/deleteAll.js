const { options } = require('./conexionDB')

const knex = require('knex')(options)

const deleteAll = async (table) => {
    try {
        await knex(table).del()
        console.log('Datos Eliminados')
    } catch (error) {
        console.log(error)
    }
    finally{
        knex.destroy()
    }
}

deleteAll('mensajes')
