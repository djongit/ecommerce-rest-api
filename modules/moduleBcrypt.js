const bcrypt = require('bcrypt');

module.exports = class Bcrypt{
    //    -- Create hashed password --
 static async toHash (password, saltRounds = 25) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (error) {
        console.error(error);
        throw error;
    }
    return null;
 }
    //   -- Compare hashed passwords --
static async toCompare (password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch(error) {
        console.error(error);
        throw error;
    }
    return false;
 }
};