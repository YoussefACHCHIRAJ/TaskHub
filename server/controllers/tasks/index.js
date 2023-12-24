const { default: mongoose } = require("mongoose");
const User = require("../../model/User");
const Task = require("../../model/Task");

const tasks = async (req, res) => {

    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const { team } = await User.findById(id).select("team");

        const tasks = await Task.aggregate([
            {
                $match: { team } // Match tasks by team ID
            },
            {
                $lookup: {
                    from: 'usertasks',
                    localField: '_id',
                    foreignField: 'task',
                    as: 'userTasks' // Store user tasks associated with the task
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { responsibleUsers: '$userTasks.user' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$responsibleUsers']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                name: 1 // Select only the 'name' field
                            }
                        }
                    ],
                    as: 'responsibleUsers' // Store the projected 'name' field in responsibleUsers
                }
            },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    description: { $first: '$description' },
                    dateStart: { $first: '$dateStart' },
                    deadline: { $first: '$deadline' },
                    responsibleUsers: { $first: '$responsibleUsers' } // Collect responsible users in an array
                }
            }
        ]);
        const teamMembers = await User.find({ team }).select("name");
        console.log({ tasks });
        res.status(200).json({ tasks, teamMembers });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = tasks;