const { buildSchema } = require('graphql');

const productsSchema = buildSchema(`
    type Product {
        id: ID!
        title: String,
        price: Int,
        description: String,
        thumbnail: String,
        code: String,
        stock: Int,
        timestamp: String
    }
    type Delete{
        delete: Int
    }
    input productInput {
        title: String,
        price: Int,
        description: String,
        thumbnail: String,
        code: String,
        stock: Int
    }
    type Query {
        getProducts(title: String, price: Int, thumbnail:String): [Product],
        getProductById(id:String): Product,
    }
    type Mutation {
        addProduct(data: productInput): Product
        updateProduct(id:String, data: productInput): Product
        deleteProduct(id:String): Delete
        deleteAllProducts: Delete
        }
`)

module.exports = productsSchema;