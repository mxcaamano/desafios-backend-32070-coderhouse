const { products } = require('../repos/index');

module.exports = {
    async save(obj){
        return await products.save(obj);
    },
    async getById(id){
        return await products.getById(id);
    },
    async getAll(){
        return await products.getAll();
    },
    async updateById(id, props){
        return await products.updateById(id, props);
    },
    async deleteById(id){
        return await products.deleteById(id);
    },
    async deleteAll(){
        return await products.deleteAll();
    },
    async getNative(id){
        return await products.getNative(id);
    },
}