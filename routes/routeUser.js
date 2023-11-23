const express = require('express');
const userRouter = express.Router();
const ServiceUser = require ('../services/serviceUser');
const ServiceUserRequest = new ServiceUser();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         delivery_address:
 *           type: string
 *         billing_address:
 *           type: string
 *         created:
 *           type: string
 *           format: date-time
 *         modified:
 *           type: string
 *           format: date-time
 */

module.exports = (app) => {
    app.use('/user', userRouter);
    

/**
 *   @swagger
 *   /user/{userId}:
 *     get:
 *       summary: Get user by ID
 *       description: Retrieve user information by specifying the user ID
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response with user information
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '401':
 *           description: Unauthorized, user not authenticated
 *         '500':
 *           description: Internal server error
 */

    userRouter.get('/:userId', async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                const { userId } = req.params;
                const response = await ServiceUserRequest.userById({id: userId});
                res.status(200).send(response);
            } catch (error) {
                next(error);
            }
        } else {
            res.redirect('/login');
        }
    })
/**
 *   @swagger
 *   /user/{userId}:
 *     put:
 *       summary: Update user by ID
 *       description: Update user information by specifying the user ID
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user to update
 *           schema:
 *             type: string
 *         - in: body
 *           name: user
 *           required: true
 *           description: Updated user data
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *       responses:
 *         '200':
 *           description: Successful response with updated user information
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '401':
 *           description: Unauthorized, user not authenticated
 *         '500':
 *           description: Internal server error
 */
    userRouter.put('/:userId', async (req, res, next)=> {
        if(req.isAuthenticated()) {
            try {
                const { userId } = req.params;
                const data = req.body;
                const response = await ServiceUserRequest.update(userId, data);
                res.status(200).send(response);
            } catch(error) {
                next(error);
            }
        } else {
            res.redirect('/login');
        }
    })
}