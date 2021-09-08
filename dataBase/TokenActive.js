const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { TokenActive, USER }, tokenPurposeEnum } = require('../config');

const TokenActiveSchema = new Schema({
    active_token: {
        type: String,
        required: true
    },
    token_purpose: {
        type: String,
        required: true,
        enum: Object.values(tokenPurposeEnum)
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(TokenActive, TokenActiveSchema);
