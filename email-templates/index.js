const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME !!!'
    }
};
