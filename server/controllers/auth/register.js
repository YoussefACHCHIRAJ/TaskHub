const { createToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const User = require("../../model/User");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const user = await User.create({ name, email, password: password.trim(), role: leader });

        delete user.password;

        const token = createToken({ id: user._id, role: user.role, });

        res.status(201).json({ user, token });
    } catch (err) {
        const error = HandleErrors.createMemberErrors(err);
        res.status(400).json({ error });

    }
}

module.exports = register