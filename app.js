// создать схему RetroCar c такими полями
// - brand
// - model
// - year
// - price
//
// произвести валидации:
//     год должен быть в диапазоне 1885-1980
// цена не меньше 0
// brand уникальный
//
// + CRUD

const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-lessons');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { carRouter } = require('./routes/index');

app.get('/', (req, res) => res.redirect('/users'));

app.use('/cars', carRouter);

app.listen(PORT, () => {
    console.log('App listen on ', PORT);
});
