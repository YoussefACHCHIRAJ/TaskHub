const { default: mongoose } = require("mongoose");
const User = require("../../model/User");

const getTeamMembers = async (req, res) => {
    const id = req.params.id;
    try {

        const _id = new mongoose.Types.ObjectId(id);
        const { team } = await User.findById(_id).select("team");

        const members = await User.find({ team }).populate('team');
        res.status(200).json({ members })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getTeamMembers;