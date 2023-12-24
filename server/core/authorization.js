const jwt = require("jsonwebtoken");
const Team = require("../model/Team");
const Member = require("../model/User");

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
            if (decoded.role !== 'leader') return res.status(401).json({message: 'Unauthorized.'});
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