module.exports = {
    PORT: process.env.PORT || 5001,
    DBPath: process.env.DBPath || 'mongodb://localhost:27017/lesson',
    CURRENT_YEAR: new Date().getFullYear(),
    FORM_MASSAGE: 'login form'
};
