const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});
const timeStamp = require('moment');

module.exports = class QueryCart {
    constructor(data = {}) {
        this.created = this.created || timeStamp.utc().toISOString();
        this.modified = timeStamp.utc().toISOString();
        
    }
    async createCart (userId) {
        
        try{
            const data = {userId, ...this};
            const psqlCommand = pgp.helpers.insert(data, null, 'cart') + 'RETURNING *';
            const request = await db.query(psqlCommand);
            return request.rows?.length? request.rows[0] : null;
        } catch(error) {
            throw new Error('Unable to create queryCart' + error)
        }
    }
    async findByUser(userId) {
        try{
            const psqlCommand = 'SELECT * FROM cart  WHERE userId = $1';
            const value = [userId]
            const request = await db.query(psqlCommand, value);
            return request.rows?.length? request.rows[0] : null;
        } catch(error) {
            throw new Error('Unable findByUser queryCart' + error);
        }
    }

    async findById(id) {
        try{
            const psqlCommand = 'SELECT * FROM cart WHERE id = $1';
            const value = [id];
            const request = await db.query(psqlCommand, value);
            return request.rows?.length? request.rows[0] : null;
        } catch(error) {
            throw new Error('Unable to findById queryCart' + error);

        }
    }
};