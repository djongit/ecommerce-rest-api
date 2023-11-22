const express = require('express');
const productRouter = express.Router();

const servicesProducts = require('../services/serviceProducts');
const servicesProductsRequest = new servicesProducts();



module.exports = (app) => {
    app.use('/products', productRouter);


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Product Managing API
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *           description: The unique identifier for a product.
 *         product_name:
 *           type: string
 *           description: The name of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         stock_quantity:
 *           type: integer
 *           description: The quantity of the product in stock.
 *         created:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created.
 *         modified:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was last modified.
 *         product_media_id:
 *           type: integer
 *           description: The unique identifier for the product media.
 *         category:
 *           type: string
 *           description: The category of the product.
*/
   

/**
 * 
 * @swagger
 * /products:
 *   get:
 *      summary: Get a list of products
 *      tags: [Products]
 *      description: Retrieve a list of all products from the database
 *      responses:
 *        200:
 *          description: A list of products
 *          content:
 *            application/json:
 *              example: [{"product_id":1,"product_name":"Nike Internationalist","description":"1980s icon original","stock_quantity":3,"created":"2023-02-16T20:38:40.000Z","modified":"2000-01-01T00:00:00.000Z","product_media_id":1,"category":"shoes"},{"product_id":2,"product_name":"Chuck Taylor All Star","description":"The most iconic, ever","stock_quantity":5,"created":"2023-10-26T14:05:32.000Z","modified":"2000-01-01T00:00:00.000Z","product_media_id":2,"category":"shoes"}]
 */


    
    productRouter.get('/', async(req, res, next) => {
        try {
            const queryParams = req.query;
            const responce = await servicesProductsRequest.getAllProducts(queryParams);
            res.status(200).send(responce);
        } catch(error) {
            next(error);
        }
    });

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Retrieve a product by id
 *     responses:
 *       200:
 *         description: A product by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: The product has not been found.
 */


    productRouter.get('/:productId', async(req, res, next) =>{
        try {
            const {productId} = req.params;
            const responce = await servicesProductsRequest.getProductById(productId);
            res.status(200).send(responce);
        } catch(error) {
            next(error);
        }
    });

/**
     * @swagger
     * /products/search/{term}:
     *   get:
     *     summary: Search products by term
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: term
     *         schema:
     *           type: string
     *         required: true
     *         description: The search term to find products
     *     responses:
     *       200:
     *         description: A list of products matching the search term
     *         content:
     *           application/json:
     *             example: [{"product_id":1,"product_name":"Nike Internationalist","description":"1980s icon original","stock_quantity":3,"created":"2023-02-16T20:38:40.000Z","modified":"2000-01-01T00:00:00.000Z","product_media_id":1,"category":"shoes"}]
     *       404:
     *         description: No products found for the given search term
     */
    productRouter.get('/search/:term', async(req, res, next) => {
        try {
            const searchQuery = req.params.term; // search term passed as parameter, to change it as query uncomment lines below
            const responce = await servicesProductsRequest.getProductSearch(searchQuery);
            res.status(200).send(responce);
        } catch(error) {
            console.log('Error executing the search query:', error);
            next(error);
        }
    });
};