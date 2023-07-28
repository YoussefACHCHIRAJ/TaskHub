const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const tasks = async (req, res) => {
    try {
        const {authorization} = req.headers;

        if(!authorization) return res.status(401).json({error: 'authorization token required.'})

        const token = authorization.split(' ')[1];
        
        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        if (!team) throw new Error("there is no team yet.");

        const tasks = await Tasks.find({ teamId: team._id });
        
        const teamMembers = await Team.getMembers(team);

        res.status(200).json({ tasks, teamMembers });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = tasks;