const bcrypt = require('../loaders/loaderBcrypt');
const queryUser = require('../queries/queryUser');
const queryUserRequest = new queryUser();


module.exports = class serviceAuth {
    async register (data) {
        const {email, password} = data;

        try  {
            const userExist = await queryUserRequest.findUserByEmail(email);
            if(userExist) {
                throw new Error('User already exists!');
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
                throw new Error(401, 'Incorrect password or username.')
            }
                //      -- Uses bcrypt to compare hashed passwords --
            if (!bcrypt.toCompare(password, userExist.password)) {
                throw new Error(401, 'Incorrect username or password.');
            }
            return userExist;
        } catch(error) {
            throw (error); 
        }
    }
}