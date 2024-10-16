// routes/categoryRoutes.js
const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
