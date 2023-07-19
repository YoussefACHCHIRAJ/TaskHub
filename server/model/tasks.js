const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    description:{
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    dateStart: {
        type: Date,
        required: true,
    },
    deadline: {
        type:Date,
        required: true
    },
    teamId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    adminId:{
        type: Schema.Types.ObjectId,
        required: true
    },
},{timestamps:true});

const Tasks = mongoose.model('Tasks',TasksSchema);

module.exports = Tasks;