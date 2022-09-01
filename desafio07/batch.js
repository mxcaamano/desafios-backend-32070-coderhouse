const { optionsSqlite3 } = require('./sqlite3/conexionDB')
const { optionsMariaDB } = require('./mariaDB/conexionDB')

const knexSqlite3 = require('knex')( optionsSqlite3 )
const knexMariaDB = require('knex')( optionsMariaDB )

// Arrays de datos preexistentes
const products = [
    {
      "title": "Placa de video AMD ASRock Challenger Radeon RX 6700 Series RX 6700 XT RX6700XT CLD 12GO OC Edition 12GB",
      "price": 482,
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_925228-MLA49727654203_042022-F.webp"
    },
    {
      "title": "Placa de video Nvidia Evga XC Gaming GeForce RTX 30 Series RTX 3060 12G-P5-3657-KR 12GB",
      "price": 485,
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_962222-MLA46231520852_062021-F.webp"
    },
    {
      "title": "Motherboard Para Mineria Z590 Btc Duo 12 Gpu Placas Pcreg",
      "price": 220,
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_608027-MLA49924296716_052022-F.webp"
    }
]

const messages = [
    {
      from: "BOTmartin@deercryptoshop.com",
      text: "Hola, bienvenido al chat! En que puedo ayudarte?",
      date: "17/08/2022 21:04:20"
    }
]

//Batch de Productos y Mensajes
const batchProducts = async () => {
    try {
        await knex("products").del()
        
        await knexMariaDB.schema.createTable("products", table =>{
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
        console.log('Tabla creada')
        console.log('Insertando datos')        
        await knexMariaDB("products").insert(products)

    } catch (error) {
        console.log(error)
    }
    finally {
        knexMariaDB.destroy()
    }
}

const batchMsgs = async () => {
    try {
        await knex("messages").del()

        await knexSqlite3.schema.createTable("messages", table =>{
            table.increments('id')
            table.string('from')
            table.string('text')
            table.datetime('date')
        })
        console.log('Tabla creada')
        console.log('Insertando datos')        
        await knexSqlite3("messages").insert(messages)
        console.log('Datos insertados')

    } catch (error) {
        console.log(error)
    }
    finally {
        knexSqlite3.destroy()
    }
}

batchProducts();
batchMsgs();