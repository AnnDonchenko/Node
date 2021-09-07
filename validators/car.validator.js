const Joi = require('joi');

const {
    carBrandsEnum,
    regex: { ID_REGEXP },
    variables: { CURRENT_YEAR }
} = require('../config');

const createCarValidator = Joi.object({
    brand: Joi.string().allow(...Object.values(carBrandsEnum)).required(),
    model: Joi.string().alphanum().min(2).max(30).trim().required(),
    year: Joi.number().min(CURRENT_YEAR - 50).max(CURRENT_YEAR).required()
});

const getCarsValidator = Joi.object({
    brand: Joi.string().allow(...Object.values(carBrandsEnum)),
    model: Joi.string().alphanum().min(2).max(30).trim(),
    year: Joi.number().min(CURRENT_YEAR - 500).max(CURRENT_YEAR)
});

const updateCarValidator = Joi.object({
    brand: Joi.string().allow(...Object.values(carBrandsEnum)),
    model: Joi.string().alphanum().min(2).max(30).trim(),
    year: Joi.number().min(CURRENT_YEAR - 500).max(CURRENT_YEAR)
});

const carIdValidator = Joi.object({
    car_id: Joi.string().regex(ID_REGEXP).required()
});

module.exports = {
    createCarValidator,
    getCarsValidator,
    updateCarValidator,
    carIdValidator
};
