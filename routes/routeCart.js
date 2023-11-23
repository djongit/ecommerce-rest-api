const express = require('express');
const cartRouter = express.Router();
const { ensureAuthenticated } = require('../modules/moduleAuthenticated');

const ServiceCart = require('../services/serviceCart');
const ServiceCartRequest = new ServiceCart();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 *
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to be added to the cart
 *         quantity:
 *           type: integer
 *           description: The quantity of the product to be added
 */


module.exports = (app) => {
    app.use('/cart', ensureAuthenticated, cartRouter);
/**
 * 
 * @swagger
 * /cart/mine:
 *   post:
 *     summary: Create a new cart for the authenticated user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful operation
 *
 *   get:
 *     summary: Get the contents of the authenticated user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartId:
 *                   type: string
 *                   description: The ID of the user's cart
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *
 */
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
/**
 * @swagger     
 * /cart/mine/items/{cartItemId}:
 *   post:
 *     summary: Add an item to the authenticated user's cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Item details to be added to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Successful operation
 *
 *   put:
 *     summary: Update an item in the authenticated user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the item in the cart to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New details for the item in the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Successful operation
 *
 *   delete:
 *     summary: Remove an item from the authenticated user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the item in the cart to be removed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *
 */
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
/**
 *     
 * /cart/mine/checkout:
 *   post:
 *     summary: Checkout the items in the authenticated user's cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Card ID and payment information for checkout
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: string
 *                 description: The ID of the card used for payment
 *               paymentInfo:
 *                 type: object
 *                 description: Payment information
 *                   properties:
 *                     // Define payment information properties here
 *     responses:
 *       200:
 *         description: Successful operation
 */


    // cartRouter.post('/mine/checkout', async (req, res, next) => {
    //     try {
    //         const { id } = req.user;
    //         const { cardId , paymentInfo } = req.body; // might be altered 
    //         const response = ServiceCartRequest.checkOut(id, cardId, paymentInfo);
    //         res.status(200).send(response);
    //     } catch(error) {
    //         next(error);
    //     }
    // })
}