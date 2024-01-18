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
       
        const chartTask = await Task.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$dateStart' },
                        month: { $month: '$dateStart' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field from results
                    year: '$_id.year',
                    month: '$_id.month',
                    count: 1
                }
            },
            {
                $sort: { year: 1, month: 1 } // Optionally, sort by year and month
            }
        ]);

        res.status(200).json({ tasksCount, teamMembersCount, authUserTaskCount, tasks, chartTask });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = defaultInfo;