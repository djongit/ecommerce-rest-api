const express = require('express');
const app = express(); // needs relocating
const productRouter = express.Router();

const servicesProducts = require('../services/serviceProducts');
const servicesProductsRequest = new servicesProducts();

module.exports = (app) => {
    app.use('/products', productRouter);
    productRouter.get('/', async(req, res, next) => {
        try {
            const queryParams = req.query;
            const responce = await servicesProductsRequest.getAllProducts(queryParams);
            res.status(200).send(responce);
        } catch(error) {
            next(error);
        }
    })

    productRouter.get('/:productId', async(req, res, next) =>{
        try {
            const {productId} = req.params;
            const responce = await servicesProductsRequest.getProductById(productId);
            res.status(200).send(responce);
        } catch(error) {
            next(error);
        }
    })

    productRouter.get('/search/:term', async(req, res, next) => {
        try {
            const searchQuery = req.params.term; // search term passed as parameter, to change it as query uncomment lines below
            
            // const searchQuery = req.query.q;
            // console.log(searchQuery);
            const responce = await servicesProductsRequest.getProductSearch(searchQuery);
            res.status(200).send(responce);
        } catch(error) {
            console.log('Error executing the search query:', error);
            next(error);
        }
    })
};