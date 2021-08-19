const path = require('path');

module.exports = {
    PORT: 5000,
    DbPath: path.join(process.cwd(), 'db', 'users.json')
}