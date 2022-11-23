const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 200, unique: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0 },
  timestamp: { type: Number, required: true, min: 0 }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;