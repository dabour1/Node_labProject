const multer = require('multer');
const _path = require('path')
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        return cb(null, `${file.filename}_${Date.now()}_${_path.extname(file.originalname)}`)
    },
});

module.exports = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
});