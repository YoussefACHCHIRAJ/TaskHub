const { default: mongoose } = require("mongoose");
const Team = require("../../model/Team");
const User = require("../../model/User");
const HandleErrors = require("../../core/handleErrors");

const storeTeam = async (req, res) => {
    try {
        const { name, roles } = req.body;
        const id = new mongoose.Types.ObjectId(req.params.id);

        const newTeam = await Team.create({ name, roles, leader: id });

        await User.findByIdAndUpdate(id, { team: newTeam._id });

        res.status(201).json({team: newTeam._id});
    } catch (error) {
        const err = HandleErrors.storeTeamError(error.errors);
        res.status(401).json(err);
    }
}


module.exports = storeTeam;