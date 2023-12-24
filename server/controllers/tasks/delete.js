const mongoose = require("mongoose");
const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/Task");
const Team = require("../../model/Team");

const deleteTask = async (req, res) => {

    const id = req.params.id;
    try {
        const { authorization } = req.headers;

        if (!authorization) throw {authorization: {message: "The Token is required."}}

        const token = authorization.split(' ')[1];;


        const decodedToken = await decodeToken(token);
        const _id = new mongoose.Types.ObjectId(id.toString());

        const deletedTask = await Tasks.deleteOne({ _id });

        if (!deletedTask) throw {deleteError: {message: "Failed delete the task."}}

        await Team.deleteTask(id, decodedToken.team);
        res.status(201).json({ res: `The task deleted: ${deletedTask}` })

    } catch (error) {
        console.log(error);
        res.status(502).json({ error: error.message });
    }

}

module.exports = deleteTask;