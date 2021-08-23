const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const expressHbs = require('express-handlebars');

const { PORT, DbPath } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.listen(PORT, () => {
    console.log('App listen on ', PORT);
});

app.get('/ping', (req, res) => {
    res.end('ping');
});

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const users = await getUsers();
        const userIndex = users.findIndex((user) => user.name === name && user.password === password);

        if (userIndex === -1) {
            res.json('Not valid login or password');
            return;
        }

        res.redirect('/calc');
    } catch (e) {
        res.status(400).json(e);
    }
});

app.get('/register', (req, res) => {
    res.render('registration');
});

app.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;

        await setUser({ name, password });
        res.redirect('/login');
    } catch (e) {
        res.status(400).json(e);
    }
});

app.get('/calc', (req, res) => {
    res.render('calc');
});

app.post('/calc', (req, res) => {
    const { value1, operator, value2 } = req.body;

    switch (operator) {
        case 'addition': {
            res.json(+value1 + +value2);
            break;
        }
        case 'subtraction': {
            res.json(+value1 - +value2);
            break;
        }
        case 'multiplication': {
            res.json(+value1 * +value2);
            break;
        }
        case 'division': {
            +value2 !== 0 ? res.json(+value1 / +value2) : res.json('Zero divide error');
            break;
        }
        default:{
            res.json('wrong operation');
        }
    }
});

const getUsers = async () => {
    try {
        const data = await fs.readFile(DbPath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.log(e);
    }
}

const setUser = async (newUser) => {
    const users = await getUsers();
    users.push(newUser);
    await fs.writeFile(DbPath, JSON.stringify(users));
}