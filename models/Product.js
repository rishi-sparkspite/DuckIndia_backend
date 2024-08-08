// models/Product.js
const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  size: String,
  weight: Number,
  wholesalePrice: Number,
  retailPrice: Number,
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  variants: [VariantSchema],
  images: [String],
});

ProductSchema.pre('save', function (next) {
  this.variants.forEach(variant => {
    variant.retailPrice = variant.wholesalePrice * 2.5;
  });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
