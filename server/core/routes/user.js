const express = require('express');
const getTeamMembers = require('../../controllers/members');
const create = require('../../controllers/members/create');
const destroyUser = require("../../controllers/members/destroy");

const router = express.Router();

router.get('/:id', getTeamMembers);

router.post("/create/:teamId", create);

router.delete("/delete/:id", destroyUser);


module.exports = router;