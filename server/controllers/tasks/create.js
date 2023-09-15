const { decodeToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const createTask = async (req, res) => {
    const { title, description, dateStart, deadline, responsables } = req.body;
    try {
        const { authorization } = req.headers;

        if (!authorization) throw {authorization: {message: "The Token is required."}}

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        const newTask = new Tasks({ title, description, dateStart, deadline, responsables, teamId: team._id, adminId: decodedToken.id });

        team.tasks.push(newTask._id);

        await newTask.save();
        await team.save();

        res.status(201).json(newTask)

    } catch (err) {
        const error = HandleErrors.tasksErrors(err.errors);
        res.status(500).json({ error });
    }
}

module.exports = createTask;