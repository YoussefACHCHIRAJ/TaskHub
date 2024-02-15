const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
}, {timestamps: true});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;