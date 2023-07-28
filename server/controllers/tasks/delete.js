const mongoose = require("mongoose");
const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const deleteTask = async (req, res) => {

    const id = req.params.id;
    try {
        const { authorization } = req.headers;

        if (!authorization) throw new Error('token is required');

        const token = authorization.split(' ')[1];;


        const decodedToken = await decodeToken(token);
        const _id = new mongoose.Types.ObjectId(id.toString());

        const deleteResult = await Tasks.deleteOne({ _id });

        if (!deleteResult) throw new Error('failed to delete the task');

        await Team.deleteTask(id, decodedToken.team);
        res.status(201).json({ res: 'task deleted' + deleteResult })

    } catch (error) {
        console.log(error);
        res.status(502).json({ error: error.message });
    }

}

module.exports = deleteTask;