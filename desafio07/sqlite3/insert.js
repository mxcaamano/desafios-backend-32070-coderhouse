const { options } = require('./conexionDB')

const knex = require('knex')(options)

const Obj = { from: "BOTmartin@deercryptoshop.com",
        text: "este es otro mensaje",
        }  

const insert = async (table, obj) => {
    try {
        await knex(table).insert(obj)
        console.log('Dato Añadido')
    } catch (error) {
        console.log(error)
    }
    finally{
        knex.destroy()
    }
}

insert('mensajes', Obj)