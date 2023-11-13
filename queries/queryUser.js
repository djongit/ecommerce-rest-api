const db = require('../db');
pgp = require('pg-promise')({capSQL: true});
module.exports = class QueryUser {
    getDate () {
        const timestamp = new Date(Date.now());
        return timestamp;
    }

    async findUserByEmail (email) {
        try {
           const psqlCommand = 'SELECT * FROM users WHERE email = $1';
           const value = [email];
           const result = await db.query(psqlCommand, value);
           return result.rows?.length? result.row[0] : null;

        } catch(error) {
            throw new Error('Unable to find email queryUser' + error);
        }
    }
    async createUser (data) {
        try {
            const created = this.getDate();
            const psqlCommand = 'INSERT INTO users(email, password, first_name, last_name, delivery_address, billing_address, created, modified) VALUES ($1, $2, $3, $4, $5, $6, $7, NULL) RETURNING *';
            const {email, password, first_name, last_name, delivery_address, billing_address} = data;
            const values = [email, password, first_name, last_name, delivery_address, billing_address, created];
            const result = await db.query(psqlCommand, values);
            return result.rows?.length? result.row[0] : null;
        } catch (error) {
            throw new Error('Unable to create queryUser' + error);
        }
    }

    async updateUser (data) {
        
        try {
            const {id, ...params} = data;
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', id);
            const psqlCommand = pgp.helper.update(params, null, 'users') + condition;
            const result = await db.query(psqlCommand);
            return result.rows?.length? result.row[0] : null;
        } catch (error) {
            throw new Error('Unable to update user queryUser' + error);
        }
    }

    async getUserById (id) {
        try{
            const psqlCommand = 'SELECT * WHERE user_id = $1';
            const value = [id];
            const result = await db.query(psqlCommand, value);
            return result.rows?.length? result.rows[0] : null;
        } catch (error) {
            throw new Error('Unable to get by Id queryUser' + error);
        }
    }
}

