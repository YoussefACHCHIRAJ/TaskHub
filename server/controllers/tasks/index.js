const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const tasks = async (req, res) => {
    try {
        const {authorization} = req.headers;

        if(!authorization) throw {authorization: {message: "The Token is required."}}

        const token = authorization.split(' ')[1];
        
        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        if (!team) throw {taskError: {message: "The team is required. Pleaze create a team."}}

        const tasks = await Tasks.find({ teamId: team._id });
        
        const teamMembers = await Team.getMembers(team);

        res.status(200).json({ tasks, teamMembers });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = tasks;