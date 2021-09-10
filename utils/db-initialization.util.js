const { userRolesEnum, variables } = require('../config');
const { dbService, passwordService } = require('../services');
const { User } = require('../dataBase');

const _firstUserCreate = async () => {
    const user = {
        name: variables.SUPER_ADMIN_NAME,
        email: variables.SUPER_ADMIN_EMAIL,
        password: variables.SUPER_ADMIN_PASSWORD,
        role: userRolesEnum.SUPER_ADMIN,
        activatedByEmail: true,
    };

    const hashedPassword = await passwordService.hash(user.password);
    await dbService.createItem(
        User,
        { ...user, password: hashedPassword }
    );
};

module.exports = {
    initializeUserCollection: async () => {
        const count = await User.countDocuments();

        if (count > 0) return;

        await _firstUserCreate();
    }
};
