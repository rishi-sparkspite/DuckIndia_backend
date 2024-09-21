const mongoose = require('mongoose');
const { helpers } = require("../controllers/mediaController");
const multer = require('multer');

const EnumMediaGroupType = {
    chats: "chats"
};

const mediaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    owner: { type: String, required: true },
    public: { type: Boolean, required: true, default: true },
    group: {
        type: {
            key: String,
            value: mongoose.Types.ObjectId
        }, 
        required: false
    }
});

const MediaModel = mongoose.model('Media', mediaSchema, "media");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imanagerTempFiles');
    },
    filename: function (req, file, cb) {
        const time = Date.now().toString();
        const uid = helpers.generateUniqueId();
        const fileName = `${uid}-${time}-${file.originalname}`;
        cb(null, fileName);
    }
});

const MulterFileHandler = multer({ storage: storage });

module.exports = { MediaModel, EnumMediaGroupType, MulterFileHandler };
