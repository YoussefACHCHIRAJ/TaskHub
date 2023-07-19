const { decodedToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const createTask = async (req, res) => {
    const {title, description, dateStart, deadline} = req.body;
    try {
        const token = req.cookies.jwt;

        if(!token) throw new Error("can not catch any token");

        const tokenDecoded = await decodedToken(token);
        
        if(!tokenDecoded || tokenDecoded.post !== "admin") throw new Error("can not found admin id");

        const team = await Team.findOne({adminId: tokenDecoded.id});
        const newTask = new Tasks({title, description, dateStart, deadline, teamId: team._id, adminId: tokenDecoded.id});
        team.tasks.push(newTask._id);
        await newTask.save();
        await team.save();
        res.status(201).json(newTask)

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = createTask;