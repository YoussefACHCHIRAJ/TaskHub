const mongoose = require("mongoose");
const Notification = require("../../model/Notification");
const UserNotification = require("../../model/UserNotification");

const storeNotification = async (taskId, responsables) => {
    try {
       
        if(!taskId || !responsables) throw new Error("Task id and responsables users are required");
       
        const task = new mongoose.Types.ObjectId(taskId);
       
        const newNotification = new Notification({task});
       
        await newNotification.save();
       
        await Promise.all(responsables.map(async responsible => {
            const user = new mongoose.Types.ObjectId(responsible);
            await UserNotification.create({notification: newNotification?._id, user});
        }));
      
        return true;
    } catch (error) {
        throw new Error("Failed to store the new notification: " + error);
    }

}

module.exports = storeNotification;