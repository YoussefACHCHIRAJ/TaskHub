const Member = require("../../model/member.js");
const {createToken , maxAge} = require("../../core/functions.js");
const handleErrors = require("../../core/handleErrors.js");

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const member = await Member.login(email,password);

        const token = createToken({id: member._id, post: member.post, team: member.team});
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        

        res.status(200).json({member: member._id,token});

    } catch (error) {
        const err = handleErrors.loginErrors(error.message)
        res.status(500).json({"error": err});
    }
}

module.exports = logIn;