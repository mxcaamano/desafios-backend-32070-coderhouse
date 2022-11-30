const ProductsDto = require('../dtos/products.dto')

class ProductsRepository {
    constructor(dao){
        this.dao = dao
    }

    save = async(obj) => {
            let objDTO = new ProductsDto(obj)
            const created = await this.dao.save(objDTO) 
            return created;
    }

    getById = async(id) => {
            const found = await this.dao.getById(id);
            return found
    }

    updateById = async(id, props) => {
            const updated = await this.dao.updateById(id, props)
            return updated
    }

    getAll = async() => {
            const found = await this.dao.getAll();
            return found
    }

    deleteById = async(id) => {
            const deleted = await this.dao.deleteById(id)
            return deleted
    }

    deleteAll = async() => {
            const deleted = await this.dao.deleteAll()
            return deleted
    }

    getNative = async(id) => {
        const found = await this.dao.getNative(id);
        return found
}
}

module.exports = { ProductsRepository }