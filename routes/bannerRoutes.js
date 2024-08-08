// routes/bannerRoutes.js
const express = require("express");
const {
  createBanner,
  getAllBanners,
  getBannerById,
  deleteBanner,
} = require("../controllers/bannerController");
const router = express.Router();

router.post("/", createBanner);
router.get("/", getAllBanners);
router.get("/:bannerId", getBannerById);
router.delete("/:bannerId", deleteBanner);

module.exports = router;
