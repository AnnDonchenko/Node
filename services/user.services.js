const path = require('path');
const fs = require('fs');

const fileDbPath = path.join(process.cwd(), 'db', 'users.js');

const writeUserToFile = (users) => {
    const textForWrite = `module.exports = \n${JSON.stringify(users)}`;

    fs.writeFile(fileDbPath, textForWrite,
        (err) => {
            console.log(err);
        });
};

module.exports = { writeUserToFile };
