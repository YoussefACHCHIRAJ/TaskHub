const jwt = require("jsonwebtoken");

const maxAge = 7 * 24 * 60 * 60;

const createToken = payload => {
    return jwt.sign(payload, process.env.secret_Key, {expiresIn: maxAge});
}
const decodedToken = async token => {
    try {
        
        const decodedToken = await jwt.verify(token , process.env.secret_Key);
        return decodedToken;

    } catch (error) {
        return null;
    }
}
module.exports = {createToken , decodedToken, maxAge};