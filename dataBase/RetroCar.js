const { Schema, model } = require('mongoose');

const retroCarSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        trim: true,
        default: 1970
    },
    price: {
        type: Number,
        trim: true,
        default: 0
    }
}, { timestamps: true });

module.exports = model('retroCar', retroCarSchema);
