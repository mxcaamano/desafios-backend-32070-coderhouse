const { fakerGen } = require("../fakerProds")

const getTestProds = async (req, res) => {
  try {
    const products = await fakerGen()
    res.status(200).json(products)
  } 
  catch (error) {
    console.log(error)
  }
}

module.exports = { getTestProds }