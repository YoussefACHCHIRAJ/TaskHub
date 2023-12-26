const { default: mongoose } = require("mongoose")
const User = require("../../model/User");
const UserTask = require("../../model/UserTask");
const destroyUser = async (req, res) => {

    try {
        
        const id = new mongoose.Types.ObjectId(req.params.id);
        console.log({id, memberId: req.params.id});
        await User.findByIdAndRemove(id);
        await UserTask.deleteMany({ user: id });
        res.status(200).json({ deleted: true });

    } catch (error) {
        
        console.log({ error });
        res.status(401).json(error);

    }
}

module.exports = destroyUser;