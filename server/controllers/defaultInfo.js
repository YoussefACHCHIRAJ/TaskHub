const { decodeToken } = require("../core/functions");
const Tasks = require("../model/tasks");
const Team = require("../model/team");

const defaultInfo = async (req, res) => {
    const {name} = req.params
    try {
        const { authorization } = req.headers;

        if (!authorization) throw { authorization: { message: "The Token is required." } }

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        const tasks = await Promise.all(team.tasks.map(async task => {
            return await Tasks.findById(task);
        }));

        const userTasks = tasks.filter(task => task.responsables.includes(name));

        const memberNumber = team.members.length;
        const tasksNumber = team.tasks.length;
        const userTasksNumber = userTasks.length;
        res.status(200).json({ memberNumber, tasksNumber, userTasksNumber, tasks: tasks.reverse() });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = defaultInfo;