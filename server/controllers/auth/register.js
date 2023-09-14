const { createToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const Member = require("../../model/member");
const Team = require("../../model/team");

const register = async (req, res) => {
    const { name, email, password, team } = req.body;
    console.table({ name, email, password, team })
    try {
        const member = await Member.create({ name, email, password:password.trim(), team });

        const newTeam = new Team({ name:team, adminId: member._id, tasks: [], members: [] });
        await newTeam.save();

        const token = createToken({ id: member._id, post: member.post, team: member.team });

        res.status(201).json({member, token});
    } catch (err) {
        const error = HandleErrors.createMemberErrors(err);
        console.log('handled error: ', error);
        res.status(400).json({ error });

    }
}

module.exports = register