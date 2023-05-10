module.exports = (app, db) => {    
    const controller = require('../controllers/cars')(app, db);
    app.route('/cars/register').post(controller.register)
    app.route('/cars/registerHistory').post(controller.registerHistory)
    app.route('/cars/getCars').get(controller.getCars)
    app.route('/cars/getCarHistory/:imei').get(controller.getCarHistory)
    app.route('/cars/getCarHistoryByDate/:imei').get(controller.getCarHistoryByDate)
    
};