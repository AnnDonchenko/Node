const { User } = require('../dataBase');

module.exports = {
    getAll: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;

        const filterObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'userRole': {
                    const rolesArr = filters.userRole.split(';');
                    filterObject.role = { $in: rolesArr };
                    break;
                }
                case 'name': {
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        const users = await User
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return users;
    }
};
