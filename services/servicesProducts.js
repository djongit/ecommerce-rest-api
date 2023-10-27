const queriesProduct = require('../queries/queriesProducts');
const queriesProductRequest = new queriesProduct();

module.exports = class servicesProducts {

    async getAllProducts(quer) {

        try {
        const allProducts = await queriesProductRequest.productAll(quer);

        return allProducts;
    } catch(error) {
        throw(error);
    }
    }

    async getProductById (productId) {
        try {
            const product = await queriesProductRequest.productById(productId);
            return product;
        } catch(error) {
            throw(error);
        }
    }

    async getProductSearch (term) {
        try {
            const product = await queriesProductRequest.productBySearch(term);
            return product;
        } catch(error) {
            throw(error);
        }
    }
    
}

 
