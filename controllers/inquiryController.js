//in
const Inquiry = require("../models/Inquiry");
const sendMail = require("../models/mailService");
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    await sendMail(
      inquiry.email,
      "Inquiry Received- DuckIndia",
      `Hello ${inquiry.name},\n\nWe have received your inquiry and our team will get back to you soon.\n\n Team DuckIndia`,
      inquiry.name,inquiry.message
      
    );

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.respondToInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    const { responseMessage } = req.body;
    await sendMail(
      inquiry.email,
      "Response to your inquiry",
      `Hello ${inquiry.name},\n\n${responseMessage}`
    );

    res.status(200).json({ message: "Response sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
