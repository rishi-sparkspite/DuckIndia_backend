// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProductsByCategory,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProductById);
 

module.exports = router;
