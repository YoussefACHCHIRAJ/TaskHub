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

        if (!tokenDecoded) throw new Error(`can not decoded token`);

        return tokenDecoded;

    } catch (error) {
        throw new Error(`somthig went wrong when decoded token: ${error.message}`);
    }
}

const hashingPassword = async (password) => {
    const slate = await bcrypt.genSalt();

    if (!slate) throw new Error("can not generate a slate");

    const hashPassword = await bcrypt.hash(password, slate)

    console.log('hashPassword: ', hashPassword);

    if (!hashPassword) throw new Error("can not hash the password");

    return hashPassword;
}
module.exports = {
    createToken,
    decodeToken,
    maxAge,
    hashingPassword
};