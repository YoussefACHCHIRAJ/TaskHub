const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    title:{
        type: String,
        required: [true,'The title is required'],
        trim: [true,"Provide a valid title"],
    },
    description:{
        type: String,
        required: [true,'The description is required'],
        trim: [true,"provide a valid description"],
    },
    dateStart: {
        type: Date,
        required: [true,"the date start is required"]
    },
    deadline: {
        type:Date,
        required: [true,"the deadline is required"]
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