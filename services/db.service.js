module.exports = {
    createItem: (schema, newItemData) => schema.create(newItemData),

    findItemsByQuery: (schema, query) => schema.find(query),

    findItemById: (schema, itemId) => schema.findById(itemId),

    findItem: (schema, filter) => schema.findOne(filter),

    findItemAndJoin: (schema, filter, tableToJoin) => schema.findOne(filter).populate(tableToJoin),

    deleteItemById: (schema, itemId) => schema.deleteOne({ _id: itemId }),

    deleteItem: (schema, filter) => schema.deleteOne(filter),

    updateItemById: (schema, itemId, newItemData) => schema.updateOne({ _id: itemId }, newItemData)
};
