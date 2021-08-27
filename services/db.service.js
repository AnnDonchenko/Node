module.exports = {
    createItem: (schema, newItemData) => schema.create(newItemData),

    findItemsByQuery: (schema, query) => schema.find(query),

    findItemById: (schema, itemId) => schema.findById(itemId),

    findItem: (schema, filter) => schema.findOne(filter),

    deleteItemById: (schema, itemId) => schema.deleteOne({ _id: itemId }),

    updateItemById: (schema, itemId, newItemData) => schema.updateOne({ _id: itemId }, newItemData)
};
