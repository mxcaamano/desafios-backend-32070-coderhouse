const { options } = require('./conexionDB')
const knex = require('knex')(options)

const batch = async (table) => {
    try {
        console.log('--> Borrando todos los datos')
        await knex(table).del()

        console.log('--> Insertamos datos')
        await knex(table).insert([
            { from: "BOTmartin@deercryptoshop.com",
            text: "Hola, bienvenido al chat! En que puedo ayudarte?"}
        ])

        console.log('--> Leemos todos los datos')
        let rows = await knex().from(table).select('*')
        for (row of rows) console.log(row)

        // console.log('--> Insertamos un dato más')
        // await knex(table).insert({ title: "El cuarto producto",
        // price: 999,
        // thumbnail: "https://http2.mlstatic.com/imagen.webp" })

        // console.log('--> leemos los datos actualizados')
        // rows = await knex().from(table).select('*')
        // for (row of rows) console.log(`${row['title']} - ${row['price']}`)

    } catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
}

batch('mensajes')