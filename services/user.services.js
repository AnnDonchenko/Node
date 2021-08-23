const path = require('path');
const fs = require('fs/promises');

const fileDbPath = path.join(process.cwd(), 'db', 'users.json');

const getUsersFromFile = async () => {
    try {
        const data = await fs.readFile(fileDbPath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.log(e);
    }
};

const writeUserToFile = async (users) => {
    try {
        const textForWrite = JSON.stringify(users, null, 4);

        await fs.writeFile(fileDbPath, textForWrite);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { writeUserToFile, getUsersFromFile };
