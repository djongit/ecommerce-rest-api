const bcrypt = requier('bcrypt');

module.exports = class Bcrypt{
    //    -- Create hashed password --
 async toHash (password, salt = 25) {
    try {
        const addSalt = bcrypt.genSalt(salt);
        const hashedPass = bcrypt.hash(password, addSalt);
        return hashedPass;
    } catch (error) {
        console.log(error);
    }
    return null;
 }
    //   -- Compare hashed passwords --
 async toCompare (password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch(error) {
        console.log(error);
    }
    return false;
 }
};