const mongoose = require("mongoose");
const Task = require("./Task");
const Schema = mongoose.Schema;

const UserNotificationSchema = new Schema({
    notification: {
        type: mongoose.Types.ObjectId,
        ref: "Notification"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    isUnRead: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});


const UserNotification = mongoose.model("UserNotification", UserNotificationSchema);

module.exports = UserNotification;