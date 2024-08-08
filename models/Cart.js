// models/Cart.js
const mongoose = require('mongoose');
const CartItem = require('./CartItem');

const CartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  items: [CartItem.schema],
  total: {
    type: Number,
    default: 0,
  },
});

CartSchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => sum + (item.quantity * item.variant.retailPrice), 0);
  next();
});

module.exports = mongoose.model('Cart', CartSchema);
