const { options } = require('./conexionDB')

const knex = require('knex')(options)

const Obj = {
    title: "Producto actualizado",
    price: 2727,
    thumbnail: "https://http2.mlstatic.com/Imagen.png",
  }

const updateById = async (table, id, obj) => {
    try {
        const response = await knex.from(table).where('id', '=', id).update(obj)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
}

updateById('productos', 3, Obj)