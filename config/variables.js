module.exports = {
    PORT: process.env.PORT || 5001,
    DBPath: process.env.DBPath || 'mongodb://localhost:27017/lesson',
    FRONTEND_SITE: process.env.FRONTEND_SITE || 'http://somesite.com',

    CURRENT_YEAR: new Date().getFullYear(),
    FORM_MASSAGE: 'login form',

    AUTHORIZATION: 'Authorization',
    TOKEN_TYPE_ACCESS: 'access',
    TOKEN_TYPE_REFRESH: 'refresh',
    TOKEN_ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'ghjsfaekr584u3ijdmskmcf6541fx',
    TOKEN_REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'zsfnlqbi240t9khph756856gdh',
    TOKEN_ACTIVE_SECRET_KEY: process.env.ACTIVE_SECRET_KEY || 'adsjuf3yqrf7uhcfncd2039ryh9fhd',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@test.ua',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
    EMAIL_FOR_TEST_LETTERS: process.env.EMAIL_FOR_TEST_LETTERS,
};
