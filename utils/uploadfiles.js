const multer = require('multer');

const upload = (directory) => {
    const Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, directory);
        },
        filename: (req, file, callback) => {
            callback(null,
                file.fieldname + '_' + Date.now() + '_' + file.originalname);
        },
    });
    return multer({ storage: Storage }).single('avatar');
};
module.exports = { upload };
