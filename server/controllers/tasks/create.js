const { decodeToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const createTask = async (req, res) => {
    const { title, description, dateStart, deadline, responsables } = req.body;
    try {
        const { authorization } = req.headers;

        if (!authorization) throw new Error('authorization is required');

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        const newTask = new Tasks({ title, description, dateStart, deadline, responsables, teamId: team._id, adminId: decodedToken.id });

        team.tasks.push(newTask._id);

        await newTask.save();
        await team.save();

        res.status(201).json(newTask)

    } catch (error) {
        const errors = HandleErrors.tasksErrors(error.message);
        console.log(errors);
        res.status(500).json({ error: errors });
    }
}

module.exports = createTask;