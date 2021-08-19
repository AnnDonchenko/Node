const express = require('express');
const expressHbs = require('express-handlebars')
const path = require('path');

const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/ping', (req, res)=>{
    res.json('Pong');
});

console.log(users);
