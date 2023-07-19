const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const tasks = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        if (!team) throw new Error("there is no team yet.");

        const tasks = await Tasks.find({ teamId: team._id });
        
        res.status(200).render("./tasks", { tasks });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = tasks;