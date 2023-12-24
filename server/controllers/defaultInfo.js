const { default: mongoose } = require("mongoose");
const { decodeToken } = require("../core/functions");
const Team = require("../model/Team");
const UserTask = require("../model/UserTask");
const Task = require("../model/Task");
const User = require("../model/User");

const defaultInfo = async (req, res) => {
    const { id } = req.params
    try {

        const _id = new mongoose.Types.ObjectId(id);

        const { team } = await User.findById(_id).select('team');
        const tasks = await Task.find({ team });
        const teamMembersCount = await User.countDocuments({ team });
        const authUserTaskCount = await UserTask.countDocuments({user: _id});
        const tasksCount = tasks.length;
        // console.log({ tasks, team, teamMember });
        // const { authorization } = req.headers;

        // if (!authorization) throw { authorization: { message: "The Token is required." } }

        // const token = authorization.split(' ')[1];

        // const decodedToken = await decodeToken(token);

        // const team = await Team.findOne({ name: decodedToken.team });

        // const tasks = await Promise.all(team?.tasks?.map(async task => {
        //     return await Tasks.findById(task);
        // }));

        // const userTasks = tasks.filter(task => task.responsables.includes(name));

        res.status(200).json({ tasksCount, teamMembersCount, authUserTaskCount, tasks });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = defaultInfo;