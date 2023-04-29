module.exports = (app, db) => {    
    const controller = require('../controllers/user')(app, db);
    app.route('/user/register').post(controller.register)
    app.route('/user/login').post(controller.login)
};