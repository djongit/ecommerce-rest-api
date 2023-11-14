const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});

module.exports = class QueryOrderItem {
    static async createOrderItem (data) {
        try {
            const psqlCommand = pgp.helpers.insert(data, null, 'cart_item') + 'RETURNING *';
            const response = db.query(psqlCommand);
            return response;
        } catch(error) {
            throw new Error('Error createOrderItem, queryOrderItem' + error);
        }
    }
};

