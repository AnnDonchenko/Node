const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { databaseTablesEnum, emailActionsEnum, variables } = require('../config');
const { TokenAuth } = require('../dataBase');
const { dbService, emailService } = require('../services');

module.exports = async () => {
    const notActivePeriod = datJs.utc().subtract(10, 'day');

    const users = await dbService.findItemsAndJoin(
        TokenAuth,
        { createdAt: { $lte: notActivePeriod } },
        databaseTablesEnum.USER
    );

    const promises = users.map(async (item) => {
        await emailService.sendMail(
            variables.EMAIL_FOR_TEST_LETTERS || item.user.email,
            emailActionsEnum.COME_BACK,
            { userName: item.user.name }
        );
    });

    await Promise.all(promises);
};
