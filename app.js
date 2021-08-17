const fs = require('fs');
const path = require('path');
// Посортувати юзерів по папках.
//     У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt
//     в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.

// console.log('-------------1--------------');
// const filesPath1800 = path.join(__dirname, '1800');
// const filesPath2000 = path.join(__dirname, '2000');
//
// moveFiles(filesPath1800, filesPath2000, "male");
// moveFiles(filesPath2000, filesPath1800, "female");
//
// function moveFiles(oldPath, newPath, condition){
//     fs.readdir(oldPath, (err, files) => {
//         if (err) throw err;
//
//         files.forEach(file => {
//             const oldFilePath = path.join(oldPath, file);
//             const newFilePath = path.join(newPath, file);
//
//             fs.readFile(oldFilePath, (err, data) => {
//                 if (err) throw err;
//                 const obj = JSON.parse(data.toString());
//                 if (obj.gender === condition) {
//                     fs.rename(oldFilePath, newFilePath, (err) => {
//                         if (err) throw err;
//                         console.log(obj.name, obj.gender, 'Rename complete!');
//                     });
//                 }
//             });
//         });
//     });
// }

// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку.
// Зробити всі файли на одному рівні вкладеності.
// (Більше інформації в записі лекції)

console.log('-------------2--------------');
function getFilesFromFolders(){
    const folderOutPath = path.join(__dirname, 'folder_1lvl');
    fs.readdir(folderOutPath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            console.log(file);
        });
    });
}
getFilesFromFolders();