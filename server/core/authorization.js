const jwt = require("jsonwebtoken");
const Team = require("../model/team");

class authorization {

    static loginPageAuth(req, res, next) {
        const token = req.cookies.jwt;
        if (!token) return next();
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return next();
            };
            res.redirect("/");
        });
    };
    static logedAuth(req, res, next) {
        const token = req.cookies.jwt;
        
        if (!token) return res.redirect("/auth/login");
        
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return res.redirect("/auth/login");
            };
            next();
        });
    };
    static adminAuth(req, res, next) {
        const token = req.cookies.jwt;
        
        if (!token) return res.redirect("/auth/login");
        
        jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
            if (error) {
                return res.redirect("/auth/login");
            };
            if (decoded.post !== 'admin') return res.redirect("/");
            next();
        });
    }

    static async createTeamAuth(req, res, next) {
        try {
            const team = await Team.find();
            console.log(team);
            if (!team.length) return next();
            
            return res.redirect("/team");

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

module.exports = authorization;