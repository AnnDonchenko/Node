module.exports = {
    notFound: { statusCode: 404, massage: 'Not Found' },
    brandExists: { statusCode: 409, massage: 'Brand is already exist' },
    priceNotValid: { statusCode: 409, massage: 'Price need to be bigger then zero' },
    yearNotValid: { statusCode: 409, massage: 'Year need to be in range 1885-1980' },
    created: { statusCode: 201, massage: 'Item is created' },
};
