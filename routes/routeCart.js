const express = requier('express');
const cartRouter = express.Router();

const ServiceCart = require('../services/serviceCart');
const ServiceCartRequest = new ServiceCart();

module.exports = (app) => {
    app.use('cart', cartRouter);

    cartRouter.post('/mine', async (req, res, next) =>{
        try {
            const { id } = req.user;
            const response = ServiceCartRequest.createCart({userId: id});
        } catch(error) {
            next(error);
        }
    })
}