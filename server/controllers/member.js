const { decodeToken } = require("../core/functions");
const Member = require("../model/member");
const Team = require("../model/team");

const createMember = async (req, res) => {
    const { name, email, password, post } = req.body;
    try {
        const token = req.cookies.jwt;
        const decodedToken = await decodeToken(token);

        const newMember = await Member.create({ name, email, password, post, team: decodedToken.team });

        await Team.addMember(decodedToken.id, newMember._id);

        res.status(201).json({ newMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createMember;