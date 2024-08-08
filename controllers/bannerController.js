// controllers/bannerController.js
const Banner = require("../models/Banner");

exports.createBanner = async (req, res) => {
  const { imageUrl, category } = req.body;
  try {
    const banner = new Banner({ imageUrl, category });
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().populate("category");
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const { bannerId } = req.params;
    const banner = await Banner.findById(bannerId).populate("category");
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    await Banner.findByIdAndDelete(bannerId);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
