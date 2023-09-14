const { decodeToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const Member = require("../../model/member");
const Team = require("../../model/team");

const createMember = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const {authorization} = req.headers;

        if(!authorization) throw new Error('the Token is required');

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const newMember = await Member.create({ name, email, password, post: role, team: decodedToken.team });

        await Team.addMember(decodedToken.id, newMember._id);

        res.status(201).json(newMember);

    } catch (error) {
        console.log(error)
        const err = HandleErrors.createMemberErrors(error.message);
        res.status(500).json({ error: err });
    }
}

module.exports = createMember;