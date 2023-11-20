const express = require('express');
const authRouter = express.Router();
const ServiceAuth = require('../services/serviceAuth');
const ServiceAuthRequest = new ServiceAuth();

module.exports = (app, passport) => {
    app.use('/auth',authRouter);
    authRouter.post('/register', async (req, res, next) => {
        try {
            const data = req.body;
            const response = await ServiceAuthRequest.register(data);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }

    })


    authRouter.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const response = ServiceAuthRequest.login({email, password});
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })

    // authRouter.get('/profile', isLoggedIn, (req, res, next) => {
        
    // })
    authRouter.get('/logout', async (req, res, next) => {
        try {
            req.logout();
            res.redirect('/login');
        } catch(error) {
            next(error);
        }
    })
}