const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    title: {
        type: String,
        required: [true, 'The title is required'],
        trim: [true, "Provide a valid title"],
    },
    description: {
        type: String,
        required: [true, 'The description is required'],
        trim: [true, "provide a valid description"],
    },
    dateStart: {
        type: Date,
        required: [true, "The date start is required"]
    },
    deadline: {
        type: Date,
        required: [true, "The deadline is required"]
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
}, { timestamps: true });

const Task = mongoose.model('Task', TasksSchema);

module.exports = Task;