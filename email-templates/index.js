const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.ACCOUNT_CREATE]: {
        templateName: 'account-create',
        subject: 'Your account was created'
    },
    [emailActionsEnum.ACCOUNT_UPDATE]: {
        templateName: 'account-update',
        subject: 'Your account was updated'
    },
    [emailActionsEnum.ACCOUNT_DELETE_ADMIN]: {
        templateName: 'account-delete-admin',
        subject: 'Your account was deleted by admin'
    },
    [emailActionsEnum.ACCOUNT_DELETE_USER]: {
        templateName: 'account-delete-user',
        subject: 'You deleted your account'
    }
};
