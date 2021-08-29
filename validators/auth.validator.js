const Joi = require('joi');

const { regex: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../config');

const authValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

module.exports = {
    authValidator
};
