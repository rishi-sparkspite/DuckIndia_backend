const express = require("express");
const { multer, uploadImageToStorage } = require("./mediaController");

const router = express.Router();

router.post("/upload", multer.single("file"), (req, res) => {
  let file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then((url) => res.status(200).send({ image: url }))
      .catch((error) => res.status(500).send({ error }));
  } else {
    res.status(422).send({ error: "file is required" });
  }
});

module.exports = router;
