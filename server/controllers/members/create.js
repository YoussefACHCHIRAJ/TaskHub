const HandleErrors = require("../../core/handleErrors");
const { default: mongoose } = require("mongoose");
const User = require("../../model/User");

const create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const team = new mongoose.Types.ObjectId(req.params.teamId);

        const newMember = await User.create({ name, email, password, role, team });

        res.status(201).json(newMember);
    } catch (err) {
        const error = HandleErrors.createMemberErrors(err);
        res.status(400).json(error);
    }
}

module.exports = create;