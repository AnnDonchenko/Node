const Joi = require('joi');

const { regex: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../config');

const authValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

const authChangePassValidator = Joi.object({
    old_password: Joi.string().regex(PASSWORD_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

const authPassValidator = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

const authEmailValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).required(),
});

module.exports = {
    authValidator,
    authChangePassValidator,
    authPassValidator,
    authEmailValidator
};
