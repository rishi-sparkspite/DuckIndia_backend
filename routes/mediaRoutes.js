const express = require("express");
<<<<<<< Updated upstream
const { multer, uploadImageToStorage } = require("../controllers/mediaController");

const router = express.Router();

router.post("/upload", multer.single("file"), (req, res) => {
  let file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then((url) => res.status(200).send({ image: url }))
      .catch((error) => res.status(500).send({ error }));
  } else {
    res.status(422).send({ error: "file is required" });
=======
const {
  unrestricted_upload,
  upload,
  fetch,
} = require("../controllers/mediaController");
const { MulterFileHandler } = require("../models/media");

const router = express.Router();

// router.post("/upload", MulterFileHandler.single("file"), async (req, res) => {
//   try {
//     const file = req.file;
//     const { group } = req.body;

//     const result = await upload( file, group);

//     if (result.success) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(500).json({ error: result.error });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.toString() });
//   }
// });
router.post("/upload", MulterFileHandler.single("file"), async (req, res) => {
  try {
    const file = req.file; // Check if file exists
    const { group } = req.body; // Any additional data in the request body

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
>>>>>>> Stashed changes
  }
});
module.exports = router;
