const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});

module.exports = class QueryCartItem {
    static async createItem (data) {
        try {
            const psqlCommand = pgp.helpers.insert(data, null, 'cart_items') + 'RETURNING *';
            const response = await db.query(psqlCommand);
            return response.rows?.length? response.rows[0] : null;

        } catch(error) {
            throw new Error('Unable to createItem queryCartItem' + error);
        }
    }

    static async updateCartItem (id, data) {
        try {
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
            const psqlCommand = pgp.helpers.update(data, null, 'cart_items') + condition;
            const response = await db.query(psqlCommand);
            return response.rows?.length? response.rows[0] : null;

        } catch (error) {
            throw new Error('Unable to updateCartItem queryCartItem' + error);
        }
    }
    static async findCartItem (cartId) {
        try {
            const value = [cartId];
            psqlCommand = `SELECT "cart_items"."qnty", 
                                    "cart_items"."cart_id",
                                    products. *
                                FROM "cartItems"
                                INNER JOIN products ON products.id = "cart_items"."product_id"
                                 WHERE "cart_id" = $1 `;
            const response = await db.query(psqlCommand, value);
            return response.rows?.length? response.rows[0] : null;
        } catch(error) {
            throw new Error('Unable to findCartItem queryCartItem' + error);
        }
    }
    static async deleteCartItem (id) {

        try {
            const psqlCommand = `DELETE 
                            FROM "cart_items"
                            WHERE cart_item_id = $1
                            RETURNING *`;
        const value = [id];
        const response = db.query(psqlCommand, value);
        return response.rows?.length? response.rows[0] : null;
        } catch(error) {
            throw new Error('Undable to delete queryCartItem' + error);
        };
        

    }
}
