const { options } = require('./conexionDB')

const knex = require('knex')(options)

const deleteById = async (table, id) => {
    try {
        await knex.from(table).where('id', '=', id).del()
        console.log('Dato Eliminado')
    } catch (error) {
        console.log(error)
    }
    finally{
        knex.destroy()
    }
}

deleteById('productos', 3)
