const db = require ('../db');

module.exports = class productQueries {
    async productAll(options) {
       try {
        const result = await db.query('SELECT * FROM products',[]);
    //    console.log(result);
       return result.rows?.length? result.rows : [];
    } catch(error) {
        throw error;
    }
    }

    // async productById(id) {

    // }


    // async productBySearch(param) {

    // }
}

// const a = new productQueries();
// console.log(a.productAll());

