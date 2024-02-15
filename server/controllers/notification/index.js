const { default: mongoose } = require("mongoose");
const UserNotification = require("../../model/UserNotification");

const getNotifications = async (req, res) => {

    try {
        const user = new mongoose.Types.ObjectId(req.params.authUser);

        const notifications = await UserNotification.find({ user }).sort({ createdAt: -1 }).populate({
            path: "notification",
            populate: {
                path: "task",
                model: "Task",
                select: "_id title"
            }
        });

        res.status(200).json({ notifications });

    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = getNotifications;