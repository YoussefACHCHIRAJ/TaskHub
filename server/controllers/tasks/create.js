const { default: mongoose } = require("mongoose");
const HandleErrors = require("../../core/handleErrors");
const Task = require("../../model/Task");
const UserTask = require("../../model/UserTask");

const createTask = async (req, res) => {
    const { title, description, dateStart, deadline, teamId, responsables } = req.body;
    console.log({ title, description, dateStart, deadline, teamId, responsables });
    try {
        const team = new mongoose.Types.ObjectId(teamId);
        const newTask = await Task.create({ title, description, dateStart, deadline, team });
        await Promise.all(responsables.map(async responsible => {
            const userId = new mongoose.Types.ObjectId(responsible);
            await UserTask.create({ user: userId, task: newTask._id });
        }))
        res.status(201).json(newTask)

    } catch (err) {
        const error = HandleErrors.tasksErrors(err.errors);
        res.status(500).json(error);
    }
}

module.exports = createTask;