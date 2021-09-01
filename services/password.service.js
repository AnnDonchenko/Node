const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const { statusCodes, statusMessages } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodes.notValidData, statusMessages.notLogined);
        }
    }
};
