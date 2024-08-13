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
    console.log("get req");
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const updateData = req.body;
  try {
    const category = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};