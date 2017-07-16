const multer = require('multer');

const upload = () => {
    const Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './static/pictures/img');
        },
        filename: (req, file, callback) => {
            callback(null,
                file.fieldname + '_' + Date.now() + '_' + file.originalname);
        },
    });
    return multer({ storage: Storage }).single('avatar');
};
module.exports = { upload };
