const Tasks = require("../../model/tasks");

const storeUpdatedTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, dateStart, deadline } = req.body;
    try {
        
        const updatedTask = await Tasks.updateOne({ _id: id },{ title, description, dateStart, deadline })
        
        if(!updatedTask) throw new Error(`failed update the Task`);
        
        res.status(201).json(updatedTask);
    } catch (error) {
        res.status(503).json({ error: error.message });
    }
}

module.exports = storeUpdatedTask;