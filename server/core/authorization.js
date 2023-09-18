const jwt = require("jsonwebtoken");
const Team = require("../model/team");
const Member = require("../model/member");

class authorization {

    static async loginPageAuth(req, res, next) {
        const token = req.cookies.jwt;
        if (!token) return next();
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return next();
            };
            res.status(401).json({message: "Authentication already complete."});
        });
    };
    
    static logedAuth(req, res, next) {
        const {authorization} = req.headers;
        
        if (!authorization) return res.status(401).json({error: 'Authorization token required.'})
        
        const token = authorization.split(' ')[1];
        
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return res.status(401).json({error: 'Authorization token failed.'})
            };
            req.user = await Member.findOne({_id:decoded.id}).select('_id');
            next();
        });
    };
    static adminAuth(req, res, next) {
        const {authorization} = req.headers;
        
        if (!authorization) return res.status(401).json({error: 'authorization token required.'})
        
        const token = authorization.split(' ')[1];
        
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return res.status(403).json({error: 'forbidden'});
            };
            if (decoded.post !== 'admin') return res.status(401).json({message: 'Unauthorized.'});
            next();
        });
    }

    static async createTeamAuth(req, res, next) {
        try {
            const team = await Team.find();
            
            if (!team.length) return next();
            
            return res.status(401).json({message: 'Unauthorized.'});

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

module.exports = authorization;