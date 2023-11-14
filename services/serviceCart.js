const QueryCart = require('../queries/queryCart');
const QueryCartRequest = new QueryCart();
const QueryCartItem = require('../queries/queryCartItem');

module.exports = class ServiceCart {
    
    async createCart (data) {
        try {
            const { userId } = data;
            const cart = await QueryCartRequest.createCart(userId);
            return cart;
        } catch(error) {
            throw new Error('Error createCart serviceCart' + error);
        }
    }

    async loadCart(userId) {
        try {
            // Load cart 
            const cart = await QueryCartRequest.findByUser(userId);
            const items = await QueryCartItem.findCartItem(cart.id);
            cart.items = items;
            return cart;
        } catch(error) {
            throw new Error('Error loadCart serviceCart' + error);
        }
    }

    async addItem(userId, data) {
        try {
            // Load cart
            const cart = await QueryCartRequest.findByUser(userId);
            // create item in cart
            const item = await QueryCartItem.createItem({cartId: cart.id, ...data});

            return item;
        } catch(error) {
            throw new Error('Error addItem serviceCart' + error);
        }
    }

    async removeItem(id) {
        try{
            const itemToRemove = await QueryCartItem.deleteCartItem(id);
            return itemToRemove;
        } catch(error) {
            throw new Error('Error removeItem serviceCart' + error);
        }
    }
    async updateItem(id, data) {
        try {
            const itemToUpdate = await QueryCartItem.updateCartItem(id, data);
            return itemToUpdate;
        } catch(error) {
            throw new Error('Error updateItem serviceCart' + error);
        }
    }
    async checkOut() {
        try {
            return console.log('Under construction');   
        } catch(error) {
            throw new Error('Error checkOut serviceCart' + error);
        }
    }
}
