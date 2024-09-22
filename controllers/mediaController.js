<<<<<<< Updated upstream
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

const storage = new Storage();
const bucket = storage.bucket("gs://duck-india.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${file.originalname}_${Date.now()}`;
    let fileUpload = bucket.file(newFileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject(error);
    });

    blobStream.on("finish", () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { multer, uploadImageToStorage };
=======
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
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: Date.now(),
        },
      },
    });

    const fileReference = bucket.file(filePath);
    const [url] = await fileReference.getSignedUrl({
      action: "read",
      expires: helpers.infiniteExpiry,
    });

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    return { success: true, msg: "File uploaded successfully.", url: url };
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

const fetch = async (name) => {
  const media = await MediaModel.findOne({ name: name }).lean();
  if (!media) {
    return { success: false, error: "File not found!" };
  }

  const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);
  const file = bucket.file(media.path);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: helpers.expiry, // Set expiry date for the URL
  });

  return { success: true, response: url };
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
    const futureTimestamp = now.getTime() + 1000 * 365 * 24 * 60 * 60 * 1000; // 1000 years in milliseconds
    return new Date(futureTimestamp);
  }

  static get expiry() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    return expiryDate;
  }
}

module.exports = { unrestricted_upload, upload, fetch, helpers };
>>>>>>> Stashed changes
