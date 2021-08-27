module.exports = {
    createItem: (schema, newItemData) => schema.create(newItemData),

    findItems: (schema) => schema.find(),

    findItemById: (schema, itemId) => schema.findById(itemId),

    findItem: (schema, filter) => schema.findOne(filter)
};
