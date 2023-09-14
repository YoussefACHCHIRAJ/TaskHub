const { createToken } = require("../../core/functions");
const Member = require("../../model/member");
const Team = require("../../model/team");

const register = async (req, res) => {
    const { name, email, password, team } = req.body;
    try {
        const member = await Member.create({ name, email, password, team });

        const newTeam = new Team({ name:team, adminId: member._id, tasks: [], members: [] });
        await newTeam.save();

        const token = createToken({ id: member._id, post: member.post, team: member.team });

        res.status(201).json({member, token});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });

    }
}

module.exports = register