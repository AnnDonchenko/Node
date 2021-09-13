// зареєструватися на AWS
//
// створити s3 та інтегрувати собі в апку. Користувач повинен мати можливість додати аватар при створенні також
// змінити його на оновленні
//
// https://youtu.be/EK4_6HnZS0w?t=6282

const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const { variables: { PORT, DBPath }, statusCodes, statusMessages } = require('./config');
const { dbInitializationService: { initializeUserCollection } } = require('./utils');

const app = express();

mongoose.connect(DBPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

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
