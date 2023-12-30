const express = require("express");
const storeTeam = require("../../controllers/team/store");
const router = express.Router();


router.post("/store/:id", storeTeam);

module.exports = router