const db = require('../db');

module.exports = class QueryUser {
    getDate () {
        const timestamp = new Date(Date.now());
        return timestamp;
    }

    async findUserByEmail (email) {
        try {
           const psqlCommand = 'SELECT * FROM users WHERE email = $1';
           const value = [email];
           const result = db.query(psqlCommand, value);
           return result.rows?.length? result.row[0] : null;

        } catch(error) {
            throw new Error(error);
        }
    }
    async createUser (data) {
        try {
            const created = this.getDate();
            const psqlCommand = 'INSERT INTO users(email, password, first_name, last_name, delivery_address, billing_address, created, modified) VALUES ($1, $2, $3, $4, $5, $6, $7, NULL) RETURNING *';
            const {email, password, first_name, last_name, delivery_address, billing_address} = data;
            const values = [email, password, first_name, last_name, delivery_address, billing_address, created];
            const result = db.query(psqlCommand, values);
            return result.rows?.length? result.row[0] : null;
        } catch (error) {
            throw error;
        }
    }
}