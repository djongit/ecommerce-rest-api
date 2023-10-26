const express = require('express');
const app = express();
const productRouter = express.Router();

const productQuery = require('../queries/productQueries');
const productQueryRequest = new productQuery();

module.exports = (app) => {
    app.use('/products', productRouter);
    productRouter.get('/', async(req, res, next) => {
        try {
            const queryParams = req.query;
            const responce = await productQueryRequest.productAll(queryParams);
        } catch(error) {
            next(error);
        }
    })

    productRouter.get('/:productId', async(req, res, next) =>{

    })
};