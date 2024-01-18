const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("../model/User");

class Authorization {

    static authorizationError = {};

    static verifyToken(token) {
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.secret_Key, async function (error, decoded) {
                if (error) reject(error);
                resolve(decoded);
            });
        })
    }

    static async authenticateUser(req, res, next) {

        try {
            const { authorization } = req.headers;

            if (!authorization) {
                Authorization.authorizationError.message = 'Authorization token is missing.'
                return res.status(401).json({authorization: Authorization.authorizationError});
            }

            const token = authorization.split(' ')[1];
            
            const decoded = await Authorization.verifyToken(token);
            next();
        } catch (error) {
            Authorization.authorizationError.message = 'Unauthorized. Failed Authentification' + error

            res.status(401).json({authorization: Authorization.authorizationError});
        }

    };

    static async authorizeAdmin(req, res, next) {

        try {
            const { authorization } = req.headers;

            if (!authorization) {
                Authorization.authorizationError.message = 'Authorization token is missing.'
                return res.status(401).json({authorization: Authorization.authorizationError});
            }

            const token = authorization.split(' ')[1];

            const decoded = await Authorization.verifyToken(token)

            if (decoded.role !== 'leader') {
                Authorization.authorizationError.message = 'Forbidden. Only leader allowed.'
                return res.status(403).json({authorization: Authorization.authorizationError});
            }
            next();
        } catch (error) {
                Authorization.authorizationError.message = 'Forbidden. Only leader allowed.'
                res.status(403).json({authorization: Authorization.authorizationError});
        }
    }

    static async checkTeamExistence(req, res, next) {
        try {
            const leaderId = new mongoose.Types.ObjectId(req.params.id);
            const leader = await User.findById(leaderId).select("team");

            if (leader.team) {
                Authorization.authorizationError.message = 'You can have only one team.'
                return res.status(409).json({authorization: Authorization.authorizationError});
            }

            next();

        } catch (error) {
                Authorization.authorizationError.message = 'Internal Server Error.'
                res.status(500).json({authorization: Authorization.authorizationError});
        }
    }
}

module.exports = Authorization;