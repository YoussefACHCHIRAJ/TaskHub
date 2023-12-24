const express = require('express');
const create = require('../../controllers/members/create');
const getTeamMembers = require('../../controllers/members');

const router = express.Router();

router.get('/:id',getTeamMembers);

router.post("/create/:teamId",create);


module.exports = router;