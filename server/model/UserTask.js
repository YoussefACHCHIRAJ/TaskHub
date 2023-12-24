const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task"
    },
});


const UserTask = mongoose.model("UserTask", UserTaskSchema);

module.exports = UserTask;


/* 
mohamed: 6585c57827373163d8e86be7
houssam: 6585c59627373163d8e86bed



*/