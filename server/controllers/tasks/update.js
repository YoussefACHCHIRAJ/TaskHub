const Tasks = require("../../model/tasks");

const updateTask = async (req, res) => {
    const id = req.params.id;
    try {
        const tasks = await Tasks.findById(id);
        
        if(!tasks) throw new Error(`there is not tasks`);

        res.status(200).render("tasks/update",{tasks})
    } catch (error) {
        res.status(503).json({error: error.message});
    }
}

module.exports = updateTask;