const { buildSchema } = require('graphql');

const cartsSchema = buildSchema(`
    type Cart {
        id: ID!,
        email: String,
        address: String,
        products: [Product],
        timestamp: String
    }
    type Product {
        id: ID!
        title: String,
        price: Int,
        description: String,
        thumbnail: String,
        code: String,
        timestamp: String,
        qty: Int
    }
    type Delete{
        delete: Int
    }
    input cartInput {
        email: String,
        address: String
    }
    input productInput {
        id_prod: String,
        qty: Int
    }
    type Query {
        getCart(email:String): Cart
    }
    type Mutation {
        createCart(data: cartInput): Cart
        deleteCart(email: String): Delete
        updateCart(dataProd: productInput, data: cartInput): Cart
        deleteCartProduct(id: String, id_prod: String): Delete
    }
`)

module.exports = cartsSchema;