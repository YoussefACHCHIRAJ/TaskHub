const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const maxAge = 7 * 24 * 60 * 60;

const createToken = payload => {
    return jwt.sign(payload, process.env.secret_Key, { expiresIn: maxAge });
}
const decodeToken = async token => {
    try {
        if (!token) throw new Error(`invalid token, token can not be null.`);

        const tokenDecoded = await jwt.verify(token, process.env.secret_Key);

        if (!tokenDecoded) throw {error:{
            message: 'Failed decoded Token.'
        }}

        return tokenDecoded;

    } catch (error) {
        throw {error: {
            message: `somthig went wrong while decoded token: ${error.message}`
        }}
    }
}

const hashingPassword = async (password) => {
    const slate = await bcrypt.genSalt();

    if (!slate) throw {error: {
        message: "Can not generate a slate"
    }}

    const hashPassword = await bcrypt.hash(password, slate)

    if (!hashPassword) throw {error: {
        message: "Can not hash the password"
    }}

    return hashPassword;
}
module.exports = {
    createToken,
    decodeToken,
    maxAge,
    hashingPassword
};