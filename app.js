// реалізуваи все з лекції:
// rate-limi, morgan, cors, helmet ...
//
// реалізуйте відправку емейлів користувачам які не заходили на вашу платформу більше 10 днів,
// робіть це в понеділок, середу та п'ятницю о 6:30

// - було би добре робити видалення старого аватару з s3 в updateById
// - можеш видаляти фото з s3 також при видаленні облікового запису

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');

require('dotenv').config();

const { variables: { PORT, DBPath, ALLOWED_ORIGINS }, statusCodes, statusMessages } = require('./config');
const { dbInitializationService: { initializeUserCollection } } = require('./utils');
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');

const app = express();

mongoose.connect(DBPath);

app.use(helmet());

app.use(cors({ origin: _configureCors }));

app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

const { authRouter, carRouter, userRouter } = require('./routes');

app.get('/', (req, res) => res.redirect('/users'));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen on ', PORT);

    cronJobs();
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

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(statusCodes.forbidden, statusMessages.corsNotAllowed), false);
    }

    return callback(null, true);
}
