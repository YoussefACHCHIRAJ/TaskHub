const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The team name is required'],
        trim: [true, "Pleaze provide a valid team name"],
    },
    roles: {
        type: Array,
        validate: {
            validator: function (array){
                return array.length > 0;
            },
            message : "Pleaze set at least one role."
        }
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });


const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;