// controllers/productController.js
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, category, variants, images } = req.body;
  try {
    const product = new Product({ name, category, variants, images });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category");

    // Format the response to include category details
    const formattedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      variants: product.variants,
      images: product.images,
      category: {
        id: product.category._id,
        name: product.category.name,
      },
    }));

    res.status(200).json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Format the response to include category details
    const formattedProduct = {
      id: product._id,
      name: product.name,
      variants: product.variants,
      images: product.images,
      category: {
        id: product.category._id,
        name: product.category.name,
      },
    };

    res.status(200).json(formattedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;
  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true }).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Format the response to include category details
    const formattedProduct = {
      id: product._id,
      name: product.name,
      variants: product.variants,
      images: product.images,
      category: {
        id: product.category._id,
        name: product.category.name,
      },
    };

    res.status(200).json(formattedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
