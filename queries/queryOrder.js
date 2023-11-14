const db = require('../db');
const pgp = require('pg-promise');
const moment = require('moment');

const QueryOrderItem = require('./queryOrderItem');

module.exports = class QueryOrder {
constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.item = data.items || [];
    this.modified = moment.utc().toISOString();
    this.total = data.total || 0;
    this.status = data.status || 'Pending';
    this.user_id = data.user_id || null;
}

addItems(items) {
    this.item = items.map((item) => new QueryOrderItem.createOrderItem(item));
}

async createOrder() {
    try {
        const { item, ...order } = this;
        const psqlCommand = pgp.helpers.insert(order, null, 'order') + 'RETURNING *';
        const result = await db.query(psqlCommand);
        if(result.rows?.length) {
            new Object.format(this, result.rows[0]);
            return result.rows[0];
        }
        return null;
        
    } catch(error) {
        throw new Error('Unable to createOrder queryOrder' + error);
    }
}
async updateOrder(data) {
    try {
        const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id: this.id});
        const psqlCommand = pgp.helpers.insert(data, null, 'order') + condition;
        const result = await db.query(psqlCommand);
        return result.rows?.length? result.rows[0] : null;
    } catch(error) {
        throw new Error('Unable to updateOrder queryOrder' + error);
    }
}
async findOrderByUser (id) {
    try {
        const psqlCommand = 'SELECT * FROM order WHERE user_id = $1';
        const value = [id];
        const result = db.query(psqlCommand, value);
        return result.rows?.length? result.rows[0] : null;
    } catch (error) {
        throw new Error('Unable findOrderByUser' + error);
    }
}
async orderById (id) {
    try {
        const psqlCommand = 'SELECT * FROM order WHERE order_id = $1';
        const value = [id];
        const result = db.query(psqlCommand, value);
        return result.rows?.length? result.rows[0] : null;
    } catch (error) {
        return new Error('Unable orderById queryOrder' + error);
    }
}
};