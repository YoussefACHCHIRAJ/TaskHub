const jwt = require("jsonwebtoken");

const maxAge = 7 * 24 * 60 * 60;

const createToken = payload => {
    return jwt.sign(payload, process.env.secret_Key, {expiresIn: maxAge});
}
const decodeToken = async token => {
    try {
        if(!token) throw new Error(`invalid token, token can not be null.`);

        const tokenDecoded = await jwt.verify(token , process.env.secret_Key);

        if(!tokenDecoded) throw new Error(`can not decoded token`);

        return tokenDecoded;

    } catch (error) {
        throw new Error(`somthig went wrong when decoded token: ${error.message}`);
    }
}
module.exports = {createToken , decodeToken, maxAge};