module.exports = {
    createItem: async (schema, newItemData) => {
        const createdItem = await schema.create(newItemData);

        return createdItem;
    },

    findItemsByQuery: async (schema, query) => {
        const items = await schema.find(query);

        return items;
    },

    findItemById: async (schema, itemId) => {
        const item = await schema.findById(itemId);

        return item;
    },

    findItemByEmail: async (schema, filter) => {
        const item = await schema.findOne({ email: filter });

        return item;
    },

    deleteItemById: async (schema, itemId) => {
        await schema.deleteOne({ _id: itemId });
    },

    updateItemById: async (schema, itemId, newItemData) => {
        await schema.updateOne({ _id: itemId }, newItemData);
    }
};
