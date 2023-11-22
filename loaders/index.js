const loaderSession = require('./loaderExpress');
const loaderRoutes = require('../routes/routeIndex');
const loaderPassport = require('./loaderPassport');
const loaderSwagger = require('./loaderSwagger');


module.exports = async (app) => {
    // const session = await loaderSession(app);
    // const passport = await loaderPassport(session);
    // await loaderRoutes(app, passport);
    
    console.log('Loading session...');
    const session = await loaderSession(app);
    console.log('Session loaded successfully.');

    console.log('Loading Passport...');
    const passport = await loaderPassport(session);
    console.log('Passport loaded successfully.');

    console.log('Loading routes...');
    await loaderRoutes(app, passport);
    console.log('Routes loaded successfully.');

    console.log('Loading Swagger...');
    await loaderSwagger(app);
    console.log('Swagger loaded successfully');

//        --- handle error ---
    app.use((error, req, res, next) => {
        const { message, status} = error;
        return res.status(status).send(message);
    });
};