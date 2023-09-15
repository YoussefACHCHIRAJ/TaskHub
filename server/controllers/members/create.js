const { decodeToken } = require("../../core/functions");
const HandleErrors = require("../../core/handleErrors");
const Member = require("../../model/member");
const Team = require("../../model/team");

const create = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        
        const {authorization} = req.headers;

        if(!authorization) throw {authorization: {message: "The Token is required."}}

        const token = authorization.split(' ')[1];

        const decodedToken = await decodeToken(token);

        const newMember = await Member.create({ name, email, password:password.trim(), post: role, team: decodedToken.team });

        await Team.addMember(decodedToken.id, newMember._id);

        res.status(201).json(newMember);

    } catch (err) {
        const error = HandleErrors.createMemberErrors(err);
        res.status(500).json({error});
    }
}

module.exports = create;