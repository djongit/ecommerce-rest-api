const QueryCart = require('../queries/queryCart');
const QueryCartRequest = new QueryCart();
const QueryCartItem = require('../queries/queryCartItem');

module.exports = class ServiceCart {
    async createCart (data) {
        try {
            const { userId } = data;
            return await QueryCartRequest.createCart(userId);
        } catch(error) {
            throw new Error('Error createCart serviceCart' + error);
        }
    }

    async loadCart (userId) {
        try {
            const 
        }
    }
}
