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
            res.status(200).send(response);
        } catch(error) {
            next(error);
        };
    });
    cartRouter.get('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;
            const response = ServiceCartRequest.loadCart(id);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        };
    });

    cartRouter.post('/mine/items', async(req, res, next) => {
        try {
            const { id } = req.name;
            const data = req.body;
            const response = ServiceCartRequest.addItem(id, data);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    });

    cartRouter.put('/mine/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const data = req.body;
            const response = ServiceCartRequest.updateItem(cartItemId, data);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    });

    cartRouter.delete('/mine/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const response = ServiceCartRequest.removeItem(cartItemId);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        };
    });

    cartRouter.post('/mine/checkout', async (req, res, next) => {
        try {
            const { id } = req.user;
            const { cardId , paymentInfo } = req.body; // might be altered 
            const response = ServiceCartRequest.checkOut(id, cardId, paymentInfo);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })
}