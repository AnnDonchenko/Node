// Хто не доробив, то закінчити Forgot Password
//
// Зробити можливість адміну створювати нових адмінів.
// При створенні має слатись лист на пошту про те, що юзер NAME створив вам аккаутн.
// В листі має бути токен, який слугує лише для встановлення нового пароля.
//
// Більше інформації з поясненнями флов у відео

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { variables: { PORT, DBPath }, statusCodes, statusMessages } = require('./config');
const { dbInitializationService: { initializeUserCollection } } = require('./utils');

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

initializeUserCollection();

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
