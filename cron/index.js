const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const sendMails = require('./sendMails');
const { variables } = require('../config');

module.exports = () => {
    cron.schedule(variables.CRON_EXP_OLD_TOKENS, async () => {
        await removeOldTokens();
    });

    cron.schedule(variables.CRON_EXP_SEND_MAILS, async () => {
        await sendMails();
    });
};
