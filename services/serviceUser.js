const QueryUser = require('../queries/queryUser');
const QueryUserRequest = new QueryUser();

module.exports = class ServiceUser {
    async userById (data) {
        try {
            const { id } = data;
            const userExist = await QueryUserRequest.getUserById(id);
            if(!userExist) {
                throw new Error(404, '404, User does not exist');
            }

            return userExist;

        } catch(error){
            throw(error);
        }
    }
    async update (data) {
        try {
            return await QueryUserRequest.update(data);
        } catch(error) {
            throw error;
        }
    }
}

