const fs = require('fs');
const path = require('path');

// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера
// (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const manOlder20Path = path.join(__dirname, 'manOlder20');
const manYounger20Path = path.join(__dirname, 'manYounger20');
const womanOlder20Path = path.join(__dirname, 'womanOlder20');
const womanYounger20Path = path.join(__dirname, 'womanYounger20');

const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]

fs.mkdir(manOlder20Path, { recursive: true }, err =>{
    if (err) throw err;
    fs.mkdir(manYounger20Path, { recursive: true }, err => {
        if (err) throw err;
        fs.mkdir(womanOlder20Path, { recursive: true }, err => {
            if (err) throw err;
            fs.mkdir(womanYounger20Path, { recursive: true }, err => {
                if (err) throw err;
                createUsersFiles(users);
            });
        });
    });
});

function createUsersFiles(users){
    for(let user of users){
        if(user.gender === 'female') {
            user.age > 20 ? createSingleFile(womanOlder20Path, user) : createSingleFile(womanYounger20Path, user);
        }else{
            user.age > 20 ? createSingleFile(manOlder20Path, user) : createSingleFile(manYounger20Path, user);
        }
    }
}

function createSingleFile(folderPath, user){
    fs.writeFile(path.join(folderPath, `${user.name}.txt`), JSON.stringify(user), err => {
        if (err) throw err;
    });
}