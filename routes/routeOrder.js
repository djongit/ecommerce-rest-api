const express = require('express');
const orderRouter = express.Router();
const { ensureAuthenticated } = require('../modules/moduleAuthenticated');
const ServiceOrder = require('../services/serviceOrder');
const ServiceOrderRequest = new ServiceOrder();
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operations related to orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         productName:
 *           type: string
 *         quantity:
 *           type: integer
 */


module.exports = (app) => {
    app.use('/order', ensureAuthenticated, orderRouter);
    /**
     * @swagger
     * /order:
     *   get:
     *     summary: Get orders by user
     *     tags: [Order]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               - id: 1
     *                 productName: 'Product 1'
     *                 quantity: 2
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    orderRouter.get('/', async(req, res, next) => {
        try {
            const { id } = req.user;
            const response = await ServiceOrderRequest.findOrderByUser(id);
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
        

    })
    /**
     * @swagger
     * /order/{id}:
     *   get:
     *     summary: Get order by ID
     *     tags: [Order]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Order ID
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Order'
     *       404:
     *         description: Order not found
     *       500:
     *         description: Internal Server Error
     */
    
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