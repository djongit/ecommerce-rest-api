const queriesProduct = require('../queries/queryProducts');
const queryProductRequest = new queriesProduct();

module.exports = class servicesProducts {

    async getAllProducts(quer) {

        try {
        const allProducts = await queryProductRequest.productAll(quer);

        return allProducts;
    } catch(error) {
        throw(error);
        
    }
    }

    async getProductById (productId) {
        try {
            const product = await queryProductRequest.productById(productId);
            return product;
        } catch(error) {           
            throw(error);
        }
    }

    async getProductSearch (term) {
        try {
            const product = await queryProductRequest.productBySearch(term);
            return product;
        } catch(error) {
            throw(error);
        }
    }
    
}

 
