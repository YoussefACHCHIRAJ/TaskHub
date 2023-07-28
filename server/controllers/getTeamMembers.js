const { decodeToken } = require("../core/functions");
const Team = require("../model/team");

const getTeamMembers = async (req, res) => {
    try {
        const {authorization} = req.headers;

        if(!authorization) throw new Error('The token is required');

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        console.log(decodedToken);

        const team = await Team.findOne({name: decodedToken.team});
        const members = await Team.getMembers(team);

        res.status(200).json(members)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getTeamMembers