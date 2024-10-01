//inquiryRoutes.js
const express = require("express");
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  respondToInquiry
} = require("../controllers/inquiryController");
const router = express.Router();

router.post("/create", createInquiry);

router.get("/", getInquiries);

router.put("/:id/status", updateInquiryStatus);
router.post("/:id/respond", respondToInquiry);

module.exports = router;
