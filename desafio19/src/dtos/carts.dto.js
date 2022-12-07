class CartsDto{
    constructor(cart){
        this.email = cart.email,
        this.address = cart.address,
        this.products = cart.products,
        this.timestamp = cart.timestamp
    }
}

module.exports = CartsDto