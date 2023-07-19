const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const createTask = async (req, res) => {
    const {title, description, dateStart, deadline} = req.body;
    try {
        const token = req.cookies.jwt;

        const decodedToken = await decodeToken(token);
        
        const team = await Team.findOne({name: decodedToken.team});

        const newTask = new Tasks({title, description, dateStart, deadline, teamId: team._id, adminId: decodedToken.id});
        
        team.tasks.push(newTask._id);
        
        await newTask.save();
        await team.save();
        
        res.status(201).json(newTask)

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = createTask;