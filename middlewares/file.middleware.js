const {
    statusCodes,
    statusMessages,
    variables: { PHOTO_MAX_SIZE, MIMETYPES }
} = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.tooBigFile);
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.wrongFileFormat);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
