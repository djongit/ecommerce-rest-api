const QueryOrder = require('../queries/queryOrder');
const QueryOrderRequest = new QueryOrder();

module.exports = class ServiceOrder {
    async orderByUser (userId) {
        try {
            const userOrders = QueryOrderRequest.findOrderByUser(userId);
            return userOrders;
        } catch (error) {
            throw error;
        }
    }
    async orderById (id) {
        try {
            const idOrders = QueryOrderRequest.orderById(id);
            return idOrders;
        } catch(error) {
            throw error;
        }
    }
};