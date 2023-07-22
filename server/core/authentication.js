const jwt = require("jsonwebtoken");
const Member = require("../model/member.js");

const checkMember = (req, res, next) => {
    const token = req.headers;
    res.locals.display = false;
    if (!token) {
        res.locals.member = null;
        return next();
    } 
    jwt.verify(token, process.env.secret_Key, async (err, decodedToken) => {
        if (err) {
            res.locals.member = null;
            return next();
        }
        if(decodedToken.post === 'admin') res.locals.display = true;
        const member = await Member.findById(decodedToken.id);
        res.locals.member = member;
        next();
    })
}

module.exports = checkMember;