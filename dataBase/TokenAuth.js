const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { TokenAuth, USER } } = require('../config');

const TokenAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(TokenAuth, TokenAuthSchema);
