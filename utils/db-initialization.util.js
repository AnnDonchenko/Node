const { userRolesEnum } = require('../config');
const { dbService, passwordService } = require('../services');
const { User } = require('../dataBase');

const firstUserCreate = async () => {
    const user = {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: '1dfgRl&4bN23s',
        role: userRolesEnum.SUPER_ADMIN,
        activatedByEmail: true,
    };

    const hashedPassword = await passwordService.hash(user.password);
    const createdUser = await dbService.createItem(User, {
        ...user,
        password: hashedPassword
    });

    console.log(`${createdUser.name} was created`);
};

module.exports = {
    initializeUserCollection: async () => {
        const count = await User.countDocuments();

        if (count > 0) return;

        await firstUserCreate();
    }
};
