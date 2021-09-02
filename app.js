// імплементувати токенти у вашу апку
//
// зробити закриті ендпоінти, тепер редагувати дані користувача може лише цей конкретний користувач.
// Видалити акаунт може власник акаунту, або admin
//
// * спробуйте реалізувати refresh

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { mainVariables: { PORT, DBPath }, statusCodes, statusMessages } = require('./config');

const app = express();

mongoose.connect(DBPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, carRouter, userRouter } = require('./routes');

app.get('/', (req, res) => res.redirect('/users'));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen on ', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.notFound,
        message: err.message || statusMessages.notFound
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodes.serverError)
        .json({
            message: err.message
        });
}
