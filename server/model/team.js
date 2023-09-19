const mongoose = require('mongoose');
const Member = require('./member');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    name: {
        type: String,
        required: [true,'The name is required'],
        trim: true,
        unique: true
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
        const team = await this.findOne({ adminId });

        if (!team) throw {error: {
            message: 'The team does not exist.'
        }}

        team.members.push(id);
        await team.save();

    } catch (error) {
        throw {error : {
            message: `Add member failed: ${error.message}`
        }}
    }
}

TeamSchema.statics.getMembers = async function (team) {
    try {
        let members = await Promise.all(team.members.map(async member => {

            const memberData = await Member.findById(member);

            memberData.set('password', undefined);

            return memberData;
        })) || [];
        
        const adminData = await Member.findById(team.adminId);
        adminData.set('password', undefined);
        members.unshift(adminData);

        if (!members) throw {error: {
            message: "There is no members in the team."
        }}

        return members;
    
    } catch (error) {
        throw {error: {
            message: `Can not get members: ${error.message}`
        }}
    }
}

TeamSchema.statics.deleteTask = async function(id, teamName) {
    try {
        const _id = new mongoose.Types.ObjectId(id.toString());
        const team = await this.updateOne(
            {name: teamName},
            {$pull: {tasks: {$in: [_id]}}},
            {new: true});

        if(!team) throw {error: {
            message: "The team does not exist."
        }}

        return;

    } catch (error) {
        throw {error: {
            message: `Delete the task from team failed: ${error.message}`
        }}
    }
}

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;