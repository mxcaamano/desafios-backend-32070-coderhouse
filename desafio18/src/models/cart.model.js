const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: Array, required: true, min: 0 },
  timestamp: { type: Number, required: true, min: 0 }
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;