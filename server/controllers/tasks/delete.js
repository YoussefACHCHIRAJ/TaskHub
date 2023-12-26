const mongoose = require("mongoose");
const { decodeToken } = require("../../core/functions");
const Team = require("../../model/Team");
const Task = require("../../model/Task");
const UserTask = require("../../model/UserTask");

const deleteTask = async (req, res) => {

    try {
        const id = req.params.id;
        const _id = new mongoose.Types.ObjectId(id);
        await Task.findByIdAndDelete(_id);
        await UserTask.deleteMany({ task: _id });

        res.status(201).json({});

    } catch (error) {
        console.log(error);
        res.status(502).json({ error: error.message });
    }

}

module.exports = deleteTask;