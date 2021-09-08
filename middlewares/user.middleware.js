const { statusCodes, statusMessages } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkUserPermission: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.loginUser;
            const user = req.loginUser;
            const { user_id } = req.params;

            if (user.id === user_id) {
                req.userPermission = user.id;
                return next();
            }

            if (!rolesArr.length || !rolesArr.includes(role)) {
                throw new ErrorHandler(statusCodes.forbidden, statusMessages.forbidden);
            }

            req.userPermission = role;
            next();
        } catch (e) {
            next(e);
        }
    },

    isAccountActivated: (req, res, next) => {
        try {
            const user = req.body.item;

            if (!user.activatedByEmail) {
                throw new ErrorHandler(statusCodes.forbidden, statusMessages.notActivatedAccount);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
