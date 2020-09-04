const config = require('../config/config');
const Logger = config.logger;
const multer = require('multer');
const upload = multer(config.multer).single(config.document);

// Adjust file upload setup for future reference and change
const uploadDocument = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            const message = `There was an error uploading the file: ${err}`;
            Logger.error(message);
            return res.status(500).json({
                message
            });
        }
        return res.json({
            file: req.file
        });
    });
};

module.exports = {
    uploadDocument
}