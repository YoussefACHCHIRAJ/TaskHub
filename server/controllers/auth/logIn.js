const Member = require("../../model/member.js");
const { createToken } = require("../../core/functions.js");
const HandleErrors = require("../../core/handleErrors.js");

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const member = await Member.login(email, password);

        const token = createToken({ id: member._id, post: member.post, team: member.team });

        res.status(200).json({ member, token });

    } catch (err) {
        const error = HandleErrors.loginErrors(err)
        res.status(500).json({error});
    }
}

module.exports = logIn;