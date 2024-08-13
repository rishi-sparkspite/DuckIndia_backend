// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProductById);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
