const express = require('express');
const create = require('../../controllers/members/create');
const getTeamMembers = require('../../controllers/members/getTeamMembers');

const router = express.Router();

router.get('/',getTeamMembers);

router.post("/create",create);

module.exports = router;