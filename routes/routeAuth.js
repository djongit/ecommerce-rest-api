const express = require('express');
const authRouter = express.Router();
const ServiceAuth = require('../services/serviceAuth');
const ServiceAuthRequest = new ServiceAuth();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       required:
 *         - email
 *         - password
 */
module.exports = (app, passport) => {
    app.use('/auth',authRouter);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

    authRouter.post('/register', async (req, res, next) => {
        try {
            const data = req.body;
            const response = await ServiceAuthRequest.register(data);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }

    });
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

    authRouter.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const response = ServiceAuthRequest.login({email, password});
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    });

    // authRouter.get('/profile', isLoggedIn, (req, res, next) => {
        
    // })
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout from the system
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to login page after logout
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
    authRouter.get('/logout', async (req, res, next) => {
        try {
            req.logout();
            res.redirect('/login');
        } catch(error) {
            next(error);
        }
    });
}