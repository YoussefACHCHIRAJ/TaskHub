const express = require('express');
const createMember = require('../../controllers/member');
const getTeamMembers = require('../../controllers/getTeamMembers');

const router = express.Router();

router.get('/',getTeamMembers);

router.get("/create", (req, res) => {
    res.render("members");
})

router.post("/create",createMember);

module.exports = router;