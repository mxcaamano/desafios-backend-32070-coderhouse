class ProductsDto{
    constructor(product){
        this.title = product.title,
        this.price = product.price,
        this.description = product.description,
        this.thumbnail = product.thumbnail,
        this.code = product.code,
        this.stock = product.stock,
        this.timestamp = product.timestamp
    }
}

module.exports = ProductsDto