const express = require('express');
const orderRouter = express.Router();
const { ensureAuthenticated } = require('../modules/moduleAuthenticated');
const ServiceOrder = require('../services/serviceOrder');
const ServiceOrderRequest = new ServiceOrder();


module.exports = (app) => {
    app.use('/order', ensureAuthenticated, orderRouter);

    orderRouter.get('/', async(req, res, next) => {
        try {
            const { id } = req.user;
            const response = await ServiceOrderRequest.findOrderByUser(id);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
        

    })

    orderRouter.get('/:id', async(req, res, next) => {
        try {
            const { id } = req.params;
            const response = await ServiceOrderRequest.orderById(id);
            res.status(200).send(response);
        } catch(error) {
            next(error)
        }
    })

}