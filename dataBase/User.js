const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { USER }, userRolesEnum } = require('../config');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    activatedByEmail: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);
