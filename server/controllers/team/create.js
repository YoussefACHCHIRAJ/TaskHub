const { decodedToken } = require("../../core/functions");
const Member = require("../../model/member");
const Team = require("../../model/team");

const createTeam = async (req, res) => {
    const { name } = req.body;
    try {
        const token = req.cookies.jwt;
        
        if(!token) throw new Error("can not catch any token");
        
        const tokenDecoded = await decodedToken(token);

        if(!tokenDecoded) throw new Error("can not found admin id");
        
        const newTeam = new Team({ name, adminId: tokenDecoded.id, tasks: [], members: [] });
        await newTeam.save();
        
        console.log('[create token]',tokenDecoded);
        console.log('[create newteam]',newTeam);

        res.status(201).json({newTeam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createTeam;