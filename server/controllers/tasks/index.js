const { decodedToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const tasks = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) throw new Error("can not catch any token");

        const tokenDecoded = await decodedToken(token);

        if (!tokenDecoded) throw new Error("can not find admin id");

        const team = await Team.findOne({ members: { $in: [tokenDecoded.id] } })
            || await Team.findOne({ adminId: tokenDecoded.id });

        if (!team) throw new Error("ther is no team yet.");

        const tasks = await Tasks.find({ teamId: team._id });
        
        res.status(200).render("./tasks", { tasks });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = tasks;