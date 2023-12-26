const { default: mongoose } = require("mongoose");
const Task = require("../../model/Task");
const UserTask = require("../../model/UserTask");

const updateTask = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const { title, description, dateStart, deadline, responsables } = req.body;
        console.log({ responsables: req.body })
        await Task.findByIdAndUpdate(id, { title, description, dateStart, deadline });

        await Promise.all(responsables.map(async respo => {
            const isResponsibleExist = await UserTask.exists({ user: respo });
            if (!isResponsibleExist) {
                await UserTask.create({ task: id, user: respo });
            }
        }));

        await UserTask.deleteMany({ user: { $nin: responsables } });
        console.log("task updated");
        res.status(200).json({})
    } catch (error) {
        console.log({ error })
        res.status(400).json({ error: error.message });
    }
}

module.exports = updateTask;