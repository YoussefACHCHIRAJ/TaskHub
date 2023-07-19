const { decodedToken } = require("../core/functions");
const Member = require("../model/member");
const Team = require("../model/team");

const createMember = async (req, res) => {
    const { name, email, password, post, team } = req.body;
    try {
        const newMember = await Member.create({ name, email, password, post, team });

        const token = req.cookies.jwt;

        if(!token) throw new Error("can not found token");

        const tokenDecoded = await decodedToken(token);

        if(!tokenDecoded) throw new Error("can not decoded token");
        
        await Team.addMember(tokenDecoded.id, newMember._id);
        
        res.status(201).json({newMember});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createMember;