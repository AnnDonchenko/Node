module.exports = {
    notFound: { statusCode: 404, massage: 'Not Found' },
    emailExists: { statusCode: 409, massage: 'Email is already exist' },
    modelExists: { statusCode: 409, massage: 'Model is already exist' },
    created: { statusCode: 201, massage: 'Item is created' },
    updated: { statusCode: 201, massage: 'Item is updated' },
    deleted: { statusCode: 204, massage: 'Item is deleted' }
};
