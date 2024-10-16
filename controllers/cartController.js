// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findOne({ cartId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { cartId, productId, size, weight, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({ cartId });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variant = product.variants.find(
      (v) => v.size === size && v.weight === weight
    );
    if (!variant) {
      return res.status(400).json({ message: "Variant not found" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) =>
        item.product.equals(productId) &&
        item.variant.size === size &&
        item.variant.weight === weight
    );

    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        variant,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateCart = async (req, res) => {
  const { cartId, items } = req.body;
  try {
    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({ cartId });
    }

    for (const item of items) {
      const { productId, size, weight, quantity } = item;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const variant = product.variants.find(v => v.size === size && v.weight === weight);
      if (!variant) {
        return res.status(400).json({ message: 'Variant not found' });
      }

      const cartItemIndex = cart.items.findIndex(i => i.product.equals(productId) && i.variant.size === size && i.variant.weight === weight);

      if (cartItemIndex > -1) {
        if (quantity <= 0) {
          cart.items.splice(cartItemIndex, 1); // Remove item if quantity is zero or less
        } else {
          cart.items[cartItemIndex].quantity = quantity; // Update quantity
        }
      } else {
        if (quantity > 0) {
          cart.items.push({
            product: productId,
            variant,
            quantity,
          });
        }
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item._id.equals(itemId));

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
