const { statusCodes, statusMessages } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkUserPermission: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.loginUser;

            const user = req.loginUser;
            const { user_id } = req.params;

            if (!rolesArr.length && user.id === user_id) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(statusCodes.forbidden, statusMessages.forbidden);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
