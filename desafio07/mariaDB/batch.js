const { options } = require('./conexionDB')
const knex = require('knex')(options)

const batch = async (table) => {
    try {
        console.log('--> Borrando todos los datos')
        await knex(table).del()

        console.log('--> Insertamos datos')
        await knex(table).insert([
            { title: "Placa de video AMD ASRock Challenger Radeon RX 6700 Series RX 6700 XT RX6700XT CLD 12GO OC Edition 12GB",
            price: 482,
            thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_925228-MLA49727654203_042022-F.webp"
            },
            { title: "Placa de video Nvidia Evga XC Gaming GeForce RTX 30 Series RTX 3060 12G-P5-3657-KR 12GB",
            price: 485,
            thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_962222-MLA46231520852_062021-F.webp" },
            { title: "Motherboard Para Mineria Z590 Btc Duo 12 Gpu Placas Pcreg",
            price: 220,
            thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_608027-MLA49924296716_052022-F.webp" }
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

batch('productos')