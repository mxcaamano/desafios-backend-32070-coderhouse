const { productsFactory, cartsFactory } = require('../daos/factory');
const { ProductsRepository } = require('./products.repository');
const { CartsRepository } = require('./carts.repository');

const products = new ProductsRepository(new productsFactory());
const carts = new CartsRepository(new cartsFactory());

module.exports = { products, carts };