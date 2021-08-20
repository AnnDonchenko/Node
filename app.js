// Вам потрібно реалізувати мінімум 3 строрінки.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
//
//     Створити файлик з юзерами, який буде виступати в ролі бази данних.
//
//     При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
//     Якщо такий мейл вже є, то видаємо помилку.
//
//     При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі.
//     Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього та
//     кнопочку, яка перекине нас на список всіх юзерів.
//     В інакшому випадку сказати, що необхідно реєструватись.
//
//     І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
//     При реєстрації мейли не можуть повторюватись

const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const {PORT} = require('./config/variables');
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
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    users.forEach((value, index) => {
        if (value.email === email && value.password === password) {
            res.redirect('/users/' + index);
            return;
        }
    });

    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/users', (req, res) => {
    const {email, password} = req.body;

    for (let user of users) {
        if (user.email === email) {
            res.json('This email exists');
            return;
        }
    }

    users.push({email, password});

    const fileDbPath = path.join(__dirname, 'db', 'users.js');
    const textForWrite = `module.exports = \n${JSON.stringify(users)}`;

    fs.writeFile(fileDbPath, textForWrite, (err) => {
        if (err) console.log(err);
    });

    res.redirect('/login');
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const current_user = users[user_id];

    if (!current_user) {
        res.status(404).json('User not found');
        return;
    }

    res.render('user', {current_user});
});

app.listen(PORT, () => {
    console.log('App listen ', PORT);
});
