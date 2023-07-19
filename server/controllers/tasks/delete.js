const { decodeToken } = require("../../core/functions");
const Tasks = require("../../model/tasks");
const Team = require("../../model/team");

const deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const token = req.cookies.jwt;
        const decodedToken = await decodeToken(token);

        const deleteResult = await Tasks.deleteOne({ _id: id });

        if (!deleteResult) throw new Error('failed to delete the task');

        await Team.deleteTask(id, decodedToken.team);
        res.status(201).redirect("/tasks");

    } catch (error) {
        res.status(502).json({ error: error.message });
    }

}

module.exports = deleteTask;