const db = require ('../db');

module.exports = class productQueries {

    async productAll(options ={}) {
       try {
        const psqlCommand = 'SELECT * FROM products';
        const result = await db.query(psqlCommand,[]);
       return result.rows?.length? result.rows : [];
    } catch(error) {
        throw error;
    }
    }

    async productById(id) {
        try{
            
            const psqlCommand = 'SELECT * FROM products WHERE product_id = $1';
            const indx = [id];           
            const result = await db.query(psqlCommand, indx);
            
            return result.rows?.length? result.rows[0] : null;
        } catch(error) {
            throw error;
        }
    }


    async productBySearch(searchQuery) {
        try {
            console.log(searchQuery);
            const psqlCommand = 'SELECT * FROM products WHERE product_name ILIKE $1';
            const searchTerm = [searchQuery];
            const result = await db.query(psqlCommand, searchTerm);
            // console.log(result);
            return result.row?.length? result.rows[0] : null;
        } catch(error) {
            throw error;
        }

    }
}


