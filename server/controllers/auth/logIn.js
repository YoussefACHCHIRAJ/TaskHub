const User = require("../../model/User.js");
const { createToken } = require("../../core/functions.js");
const HandleErrors = require("../../core/handleErrors.js");

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.login(email, password);

        const token = createToken({ id: user._id, role: user.role });

        res.status(200).json({ user, token });

    } catch (err) {
        const error = HandleErrors.loginErrors(err)
        res.status(500).json({error});
    }
}

module.exports = logIn;