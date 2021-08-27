// создать схему RetroCar c такими полями
// - brand
// - model
// - year
// - price
//
// произвести валидации:
// год должен быть в диапазоне 1885-1980
// цена не меньше 0
// brand уникальный
//
// + CRUD

const express = require('express');
const mongoose = require('mongoose');

const { mainVariables: { PORT, DBPath } } = require('./config');

const app = express();

mongoose.connect(DBPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const carRouter = require('./routes/car.route');

app.get('/', (req, res) => res.redirect('/users'));

app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen on ', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
