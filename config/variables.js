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
    TOKEN_ACTIVATE_ACCOUNT_SECRET_KEY: process.env.TOKEN_ACTIVATE_ACCOUNT_SECRET_KEY || 'slkjfdslajfw9udsiadjmlaskmc',
    TOKEN_FORGOT_PASSWORD_SECRET_KEY: process.env.TOKEN_FORGOT_PASSWORD_SECRET_KEY || 'ascm,wo[eijncwou[ecno[m',
    TOKEN_PASSWORD_CHANGE_ADMIN_SECRET_KEY: process.env.TOKEN_PASSWORD_CHANGE_ADMIN_SECRET_KEY || 'asdmpoq394937hdnsmdd0293',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@test.ua',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
    EMAIL_FOR_TEST_LETTERS: process.env.EMAIL_FOR_TEST_LETTERS,

    SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || 'Super Admin',
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || 'admin@example.com',
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || '1dfgRl&4bN23s',

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    },
    AWS_S3_NAME: process.env.AWS_S3_NAME || '',
    AWS_S3_REGION: process.env.AWS_S3_REGION || '',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',
};
