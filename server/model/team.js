const mongoose = require('mongoose');
const { decodedToken } = require('../core/functions');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tasks: Array,
    members: Array,
}, { timestamps: true });

TeamSchema.statics.addMember = async function (adminId, id) {
    try {
        const team = await this.findOne({adminId});

        if (!team) throw new Error("can not found team");

        team.members.push(id);
        await team.save();

    } catch (error) {
        throw new Error(`add member failed: ${error.message}`);
    }
}

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;