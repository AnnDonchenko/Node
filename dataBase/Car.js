const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { CAR }, carBrandsEnum } = require('../config');

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

module.exports = model(CAR, carSchema);
