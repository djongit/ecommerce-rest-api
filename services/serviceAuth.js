const bcrypt = require('../modules/moduleBcrypt');
const queryUser = require('../queries/queryUser');
const queryUserRequest = new queryUser();


module.exports = class serviceAuth {
    async register (data) {
        const {email, password} = data;

        try  {
            const userExist = await queryUserRequest.findUserByEmail(email);
            if(userExist) {
                const error = new Error('User already exists!');
                error.status = 400; // Bad request for duplicate user
                throw error;
            }
            const hashedPassword = bcrypt.toHash(password);
            data.password = hashedPassword;
            return await queryUserRequest.createUser(data);
        } catch (error) {
            throw error;
        }
                    


    }
    async login (data) {
        const { email, password } = data;

        try {
            const userExist = await queryUserRequest.findUserByEmail(email);
            if(!userExist) {
                const error = new Error( 'Incorrect password or username.');
                error.status = 401;
                throw error;
            }
                //      -- Uses bcrypt to compare hashed passwords --
            if (!bcrypt.toCompare(password, userExist.password)) {
                const error = new Error( 'Incorrect password or username.');
                error.status = 401;
                throw error;              
            }
            return userExist;
        } catch(error) {
            throw (error); 
        }
    }
}