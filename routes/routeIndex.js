const routeAuth = require('./routeAuth');
const routeCart = require('./routeCart');
const routeOrder = require('./routeOrder');
const routeProducts = require('./routeProducts');
const routeUser = require('./routeUser');

module.exports = (app, passport) => {
    routeAuth(app, passport);
    routeCart(app, passport);
    routeOrder(app, passport);
    routeProducts(app);
    routeUser(app);
};