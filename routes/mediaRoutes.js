const express = require("express");
const {
  unrestricted_upload,
  upload,
  fetch,
} = require("../controllers/mediaController");
const { MulterFileHandler } = require("../models/media");

const router = express.Router();

// Route for uploading files
router.post("/upload", MulterFileHandler.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { group } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await upload(file, group);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// Route for fetching files
router.get("/fetch", async (req, res) => {
  try {
    const mediaName = req.query.media;

    if (!mediaName) {
      return res.status(400).json({ error: "Media name is required" });
    }

    // Pass the response object to the fetch method for streaming
    await fetch(mediaName, res);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
