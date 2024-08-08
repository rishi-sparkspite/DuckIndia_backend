// controllers/categoryController.js
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  console.log("Received data:", req.body);
  const { name } = req.body;
  try {
    const category = new Category({ name });
    console.log("Category to save:", category);
    await category.save();
    console.log("Category saved:", category);
    res.status(201).json(category);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Other CRUD operations would be defined here
