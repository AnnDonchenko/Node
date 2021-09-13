const Joi = require('joi');

const {
    userRolesEnum,
    regex: { EMAIL_REGEXP, PASSWORD_REGEXP, ID_REGEXP }
} = require('../config');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required(),
    avatar: Joi.string()
});

const createAdminValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required(),
    role: Joi.string().allow(...Object.values(userRolesEnum))
});

const getUsersValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(EMAIL_REGEXP),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    avatar: Joi.string()
});

const userIdValidator = Joi.object({
    user_id: Joi.string().regex(ID_REGEXP).required()
});

module.exports = {
    createUserValidator,
    createAdminValidator,
    getUsersValidator,
    updateUserValidator,
    userIdValidator
};
