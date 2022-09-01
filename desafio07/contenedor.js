class Contenedor {
    constructor(knex, table){
        this.knex = knex
        this.table = table
    }

    async save(obj){
        try {
            await this.knex(this.table).insert(obj)
            console.log('Datos Añadidos')
        } catch (error) {
            console.log(error)
        }
        finally{
            this.knex.destroy()
        }
    }

    async getById(id){
        try {
            const response = await this.knex(this.table).select('*').where('id', '=', id)
            console.log(`Producto: ${response} `)
            return response
        } catch (error) {
            console.log(error)
        }
        finally {
            this.knex.destroy()
        }
    }

    async updateById(obj){
        try {
            const response = await this.knex(this.table).where('id', '=', id).update(obj)
            console.log(`Producto actualizado: ${response} `)
            return response
        } catch (error) {
            console.log(error)
        }
        finally {
            this.knex.destroy()
        }
    }

    async getAll(){
        try {
            const response = await this.knex.from(this.table).select('*')
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
        finally {
            this.knex.destroy()
        }
    }

    async deleteById(id){
        try {
            await this.knex.from(this.table).where('id', '=', id).del()
            console.log('Dato Eliminado')
        } catch (error) {
            console.log(error)
        }
        finally{
            this.knex.destroy()
        }
    }

    async deleteAll(){
        try {
            await this.knex(this.table).del()
            console.log('Datos Eliminados')
        } catch (error) {
            console.log(error)
        }
        finally{
            this.knex.destroy()
        }
    }
}
module.exports = Contenedor;