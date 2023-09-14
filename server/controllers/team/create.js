const { decodeToken } = require("../../core/functions");
const Member = require("../../model/member");
const Team = require("../../model/team");

const createTeam = async (req, res) => {
    const { name } = req.body;
    try {
        const {authorization} = req.headers;

        if(!authorization) return res.status(401).json({error: 'authorization token required.'})

        const token = authorization.split(' ')[1];
        
        const decodedToken = await decodeToken(token);
        
        if(!decodedToken) throw new Error("can not found admin id");
        
        const newTeam = new Team({ name, adminId: decodedToken.id, tasks: [], members: [] });
        await newTeam.save();
        

        res.status(201).json({newTeam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createTeam;