const { default: mongoose } = require("mongoose");
const UserNotification = require("../../model/UserNotification");

const updateNotification = async (req, res) => {
    try {
        const user = new mongoose.Types.ObjectId(req.params.authUser);
        const result = await UserNotification.updateMany({ user }, { $set: { isUnRead: false } });
        console.log({ result })
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({ error });

    }
}

module.exports = updateNotification;