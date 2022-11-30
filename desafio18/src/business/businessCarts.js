const { carts } = require('../repos/index');

module.exports = {
    async save(obj){
        return await carts.save(obj);
    },
    async getById(id){
        return await carts.getById(id);
    },
    async getAll(){
        return await carts.getAll();
    },
    async updateById(id, props){
        return await carts.updateById(id, props);
    },
    async deleteById(id){
        return await carts.deleteById(id);
    },
    async deleteAll(){
        return await carts.deleteAll();
    },
    async getByEmail(email){
        return await carts.getByEmail(email);
    },
}