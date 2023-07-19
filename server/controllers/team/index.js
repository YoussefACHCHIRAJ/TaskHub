const Team = require("../../model/team")
const { decodeToken} = require("../../core/functions");

const team = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        const decodedToken = await decodeToken(token);

        const team = await Team.findOne({ name: decodedToken.team });

        const members = await Team.getMembers(team);

        res.status(200).render("./team", { team, members });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = team;