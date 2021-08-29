// Вам необхідно покрити всі місця, де це необхідно валідаторами JOI (query, params, body).
//
//     Зробити хешування паролів
//
// Зробити заготовку для флоу аутернтифікації. Тобто роут, контроллер, мідлвари і так далі
// https://www.youtube.com/watch?v=NO8rRUk_G_I&t=5700s

const express = require('express');
const mongoose = require('mongoose');

const { mainVariables: { PORT, DBPath }, statusCodes, statusMessages } = require('./config');

const app = express();

mongoose.connect(DBPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter } = require('./routes/index');

app.get('/', (req, res) => res.redirect('/users'));

app.use('/users', userRouter);
app.use('/cars', carRouter);
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
