const { Schema, model } = require('mongoose');

const { carBrandsEnum } = require('../config/index');

const carSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(carBrandsEnum)
    },
    model: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    year: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
