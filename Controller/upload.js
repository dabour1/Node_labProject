const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Can upload images only"), false);
    }
};
const upload = multer(
    {
        storage: multerStorage,
        limits: { fileSize: 1000000 },
        fileFilter: multerFilter
    });
module.exports = upload;




