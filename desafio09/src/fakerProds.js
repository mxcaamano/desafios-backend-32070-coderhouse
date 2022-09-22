const faker = require('faker');

const fakerGen = async () => {
  let array = []
  for(let i = 0; i < 6; i++){
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
    }
    array.push(product)
  }
  return array
}

module.exports = { fakerGen }