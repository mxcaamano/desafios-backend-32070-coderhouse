const { options } = require('./conexionDB')

const knex = require('knex')(options)

const Obj = {
    title: "Motherboard Para Mineria Z590 Btc Duo 12 Gpu Placas Pcreg",
    price: 220,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_608027-MLA49924296716_052022-F.webp",
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

insert('productos', Obj)