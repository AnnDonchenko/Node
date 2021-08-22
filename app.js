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

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter, registrationRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));
app.get('/', (req, res) => res.redirect('/auth'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/registration', registrationRouter);

app.listen(PORT, () => {
    console.log('App listen ', PORT);
});
