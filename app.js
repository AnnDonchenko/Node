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
//             fs.readFile(oldFilePath, (err1, data) => {
//                 if (err1) throw err1;
//                 const obj = JSON.parse(data.toString());
//                 if (obj.gender === condition) {
//                     fs.rename(oldFilePath, newFilePath, (err2) => {
//                         if (err2) throw err;
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
const folderOutPath = path.join(__dirname, 'folder_1lvl');

function getFilesFromFolders(folderOutPath) {
    fs.readdir(folderOutPath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(folderOutPath, file);
            const newFilePath = path.join(__dirname, 'new_folder_for_files', file);
            fs.stat(filePath, (err1, stats) => {
                if (err1) throw err1;

                if (stats.isFile()) {
                    fs.rename(filePath, newFilePath, (err2) => {
                        if (err2) throw err2;
                        console.log(file, 'Rename complete!');
                    });
                }

                if (stats.isDirectory()) {
                    getFilesFromFolders(filePath);
                }
            });
        });
    });
}

getFilesFromFolders(folderOutPath);