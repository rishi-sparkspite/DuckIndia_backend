const express = require("express");
const { MulterFileHandler, uploadImageToStorage } = require("../controllers/mediaController");

const router = express.Router();

router.post("/upload", MulterFileHandler.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then((url) => res.status(200).send({ image: url }))
      .catch((error) => res.status(500).send({ error: error.toString() }));
  } else {
    res.status(422).send({ error: "file is required" });
  }
});

module.exports = router;
