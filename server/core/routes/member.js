const express = require('express');
const createMember = require('../../controllers/members/createMember');
const getTeamMembers = require('../../controllers/members/getTeamMembers');

const router = express.Router();

router.get('/',getTeamMembers);

router.post("/create",createMember);

module.exports = router;