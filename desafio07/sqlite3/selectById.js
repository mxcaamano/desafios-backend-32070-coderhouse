const { options } = require('./conexionDB')

const knex = require('knex')(options)

const selectById = async (table, id) => {
    try {
        const response = await knex.from(table).select('*').where('id', '=', id)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
}

selectById('mensajes', 2)
