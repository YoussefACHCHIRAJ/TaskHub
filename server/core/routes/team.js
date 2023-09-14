const express = require('express');
const team = require('../../controllers/team');
const createTeam = require('../../controllers/team/create');
const authorization = require('../authorization');

const router = express.Router();

router.post("/create",authorization.adminAuth, createTeam);

module.exports = router;