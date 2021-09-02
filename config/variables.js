module.exports = {
    PORT: process.env.PORT || 5001,
    DBPath: process.env.DBPath || 'mongodb://localhost:27017/lesson',

    CURRENT_YEAR: new Date().getFullYear(),
    FORM_MASSAGE: 'login form',

    AUTHORIZATION: 'Authorization',
    TOKEN_TYPE_ACCESS: 'access',
    TOKEN_TYPE_REFRESH: 'refresh',
    TOKEN_ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'ghjsfaekr584u3ijdmskmcf6541fx',
    TOKEN_REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'zsfnlqbi240t9khph756856gdh'
};
