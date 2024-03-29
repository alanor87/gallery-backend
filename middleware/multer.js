const path = require('path');
const multer = require('multer');

const imgStorePath = path.join(process.cwd(), "uploads");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imgStorePath)
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '_' + file.originalname;
        cb(null, fileName)
    },
})
const filesUploadHandler = multer({ storage: multerStorage });

module.exports = { filesUploadHandler };
