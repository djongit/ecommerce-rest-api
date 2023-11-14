const QueryOrder = require('../queries/queryOrder');
const QueryOrderRequest = new QueryOrder();

module.exports = class ServiceOrder {
    async orderByUser (userId) {
        try {
            const userOrders = QueryOrderRequest.findByUser(userId);
            return userOrders;
        } catch (error) {
            throw error;
        }
    }
}