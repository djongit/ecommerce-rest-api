const express = require('express');
const orderRouter = express.Router();



module.exports = (app) => {
    app.use('/order', orderRouter);


}