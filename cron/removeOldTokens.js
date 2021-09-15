const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { TokenActive, TokenAuth } = require('../dataBase');

module.exports = async () => {
    const previousMonth = datJs.utc().subtract(1, 'month');

    await TokenActive.deleteMany({ createdAt: { $lte: previousMonth } });
    await TokenAuth.deleteMany({ createdAt: { $lte: previousMonth } });
};
