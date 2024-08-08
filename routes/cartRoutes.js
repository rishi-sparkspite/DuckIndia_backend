// routes/cartRoutes.js
const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/:cartId", getCart);
router.post("/add", addToCart);
router.delete("/remove/:cartId/:itemId", removeFromCart);
router.put("/update", updateCart);
module.exports = router;
