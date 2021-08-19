const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const expressHbs = require('express-handlebars');

const {PORT, DbPath} = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

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

app.listen(PORT, () => {
    console.log('App listen on ', PORT);
});

app.get('/ping', (req, res) => {
    res.end('ping');
})

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/login', async (req, res) => {
    const users = await getUsers();

    console.log(users);
    if (!users) {
        res.end('Register first');
        return;
    }
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const user = req.body;
        await setUser(user);
        res.render('login');
    } catch (e) {
        res.end('something wrong!');
    }
});

app.get('/register', (req, res) => {
    res.render('registration');
});
app.post('/register', async (req, res) => {
    try {
        const {name, password} = req.body;
        console.log(name);
        await setUser({name, password})
        res.redirect('/login')
    }catch (e){
        res.status(400).json(e)
    }
})
app.post('/calc', (req, res) => {
    res.render('calc');
});