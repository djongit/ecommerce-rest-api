const express = require('express');
const userRouter = express.Router();

const ServiceUser = require ('../services/serviceUser');
const ServiceUserRequest = new ServiceUser();

module.exports = () => {
    app.use('user', userRouter);
    userRouter.get('./:userId', async (req, res, next) => {
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