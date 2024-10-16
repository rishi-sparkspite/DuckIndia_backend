const admin = require("firebase-admin");
const { EnumMediaGroupType, MediaModel } = require("../models/media");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const unrestricted_upload = async (file, group = null, IsPublic = true) => {
  try {
    const time = Date.now().toString();
    const fileName = `${helpers.generateUniqueId()}${time}${path.extname(
      file.originalname
    )}`;
    const filePath = `public/unrestrictedAccess/${fileName}`;

    const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);
    await bucket.upload(file.path, {
      destination: filePath,
      public: true, // Set the file as publicly accessible
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: Date.now(),
        },
      },
    });

    // Generate the public URL for the uploaded file
    const publicUrl = `https://storage.googleapis.com/${process.env.STORAGE_BUCKET}/${filePath}`;

    // Delete the file from the temporary folder
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    return { success: true, msg: "File uploaded successfully.", url: publicUrl };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
};

const upload = async (file, group = null, IsPublic = true) => {
  try {
    const time = Date.now().toString();
    const fileName = `${helpers.generateUniqueId()}${time}${path.extname(
      file.originalname
    )}`;
    const fileHash = helpers.hashUID(fileName);
    const fileAccessName = `${fileHash}${time}`;
    const filePath = `media/${fileName}`;

    const media = new MediaModel({
      name: fileAccessName,
      path: filePath,
      public: IsPublic,
    });

    if (group) {
      media.group = { key: EnumMediaGroupType.chats, value: group };
    }
    await media.save();

    const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);
    await bucket.upload(file.path, {
      destination: filePath,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: Date.now(),
        },
      },
    });

    // Delete the file from the temporary folder
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    const url = `/media/fetch?media=${fileAccessName}`;
    return { success: true, msg: "File uploaded successfully.", url: url };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
};

const fetch = async (name, res) => {
  try {
    // Find the media entry in the database
    const media = await MediaModel.findOne({ name: name }).lean();
    if (!media) {
      return res.status(404).send("File not found!");
    }

    // Retrieve the bucket and the file from Firebase Storage
    const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);
    const file = bucket.file(media.path);

    // Pipe the file directly to the response to send the binary data (e.g., images, PDFs)
    file.createReadStream()
      .on("error", (err) => {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading file.");
      })
      .on("response", (fileRes) => {
        // Set the appropriate content type headers
        res.setHeader("Content-Type", fileRes.headers["content-type"]);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${media.name}"`
        );
      })
      .pipe(res); // Pipe the file's data to the response object
  } catch (err) {
    console.error("Error fetching file:", err);
    return res.status(500).send("Error fetching file.");
  }
};

class helpers {
  static hashUID(_id) {
    const hash = crypto.createHash("sha256");
    hash.update(_id);
    return hash.digest("hex");
  }

  static generateUniqueId() {
    return crypto.randomBytes(16).toString("hex");
  }

  static downloadFile = (file) => {
    return new Promise((resolve, reject) => {
      file.download((err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };

  static get infiniteExpiry() {
    const now = new Date();
    const futureTimestamp =
      now.getTime() + 1000 * 365 * 24 * 60 * 60 * 1000; // 1000 years in milliseconds
    return new Date(futureTimestamp);
  }

  static get expiry() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    return expiryDate;
  }
}

module.exports = { unrestricted_upload, upload, fetch, helpers };
