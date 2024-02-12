const express = require("express");
const storeTeam = require("../controllers/team/store");
const Authorization = require('../core/Authorization');


const router = express.Router();


router.post("/store/:id", Authorization.checkTeamExistence, storeTeam);

module.exports = router