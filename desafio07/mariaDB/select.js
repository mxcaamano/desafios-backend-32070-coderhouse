const { options } = require('./conexionDB')

const knex = require('knex')(options)

const select = async (table) => {
    try {
        const response = await knex.from(table).select('*')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
}

select('productos')