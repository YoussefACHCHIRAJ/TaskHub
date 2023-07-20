const {decodeToken} = require("../core/functions");
const Member = require("../model/member");

const profile = async (req, res) => {
    // const _id = req.params.id;
    try {
        const token = req.cookies.jwt;
        const decodedToken = await decodeToken(token);

        const fetchProfileData = await Member.findById(decodedToken.id);

        if(!fetchProfileData) throw new Error("the user does not exist");
        
        const {name, email, post, team} = fetchProfileData;
        
        res.status(200).render("profile",{name, email, post, team});
        
    } catch (error) {
        res.status(503).json({error: error.message});
    }
}

module.exports = profile;