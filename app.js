const express = require('express');
const expressHbs = require('express-handlebars')
const path = require('path');
const fs = require('fs');

const {PORT} = require('./config/variables')
const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/ping', (req, res) => {
    res.json('Ping');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', (req, res) => {
    const newUser = req.body;
    users.push(newUser);

    const fileDbPath = path.join(__dirname, 'db', 'users.js');
    const textForWrite = `module.exports = \n${JSON.stringify(users)}`;

    fs.writeFile(fileDbPath, textForWrite, (err)=>{
        if (err) console.log(err);
    });

    res.render('login');
});

app.post('/users', (req, res) => {
    const {name, password} = req.body;
    for (let user of users) {
        if (user.name === name && user.password === password) {
            res.render('users', {users});
            return;
        }
    }
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/user/:user_id', (req, res) => {
    const {user_id} = req.params;
    const current_user = users[user_id];
    if (!current_user) {
        res.status(404).end('User not found');
        return;
    }
    res.render('user', {current_user});
});

app.listen(PORT, () => {
    console.log('App listen ', PORT);
});
