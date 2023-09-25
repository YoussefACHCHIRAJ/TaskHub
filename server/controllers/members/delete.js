const { decodeToken } = require("../../core/functions");
const Member = require("../../model/member");
const Team = require("../../model/team");

const deleteMember = async (req, res) => {
    const memberId = req.params.id;
    try {
        const { authorization } = req.headers;

        if (!authorization) throw { authorization: { message: "The Token is required." } };

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const deleteMemberFromTeam = await Team.updateOne({
            name: decodedToken.team
        }, {
            $pull: { 'members':  { $in : [memberId]} }
        });

        if (deleteMemberFromTeam.nModified === 0) {
            return res.status(404).json({ error: "Member not found in the team." });
        }


        const deletedMember = await Member.deleteOne({ _id: memberId });

        res.status(200).json({ msg: "Member deleted" });
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = deleteMember