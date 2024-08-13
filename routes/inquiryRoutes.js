const express = require("express");
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} = require("../controllers/inquiryController");
const router = express.Router();

router.post("/", createInquiry);

router.get("/", getInquiries);

router.put("/:id/status", updateInquiryStatus);

module.exports = router;
