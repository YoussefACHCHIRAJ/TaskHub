const express = require('express');
const getTeamMembers = require('../controllers/members');
const create = require('../controllers/members/create');
const destroyUser = require("../controllers/members/destroy");
const Authorization = require('../core/Authorization');


const router = express.Router();

router.get('/:id', getTeamMembers);

router.post("/create/:leader", Authorization.authorizeAdmin, create);

router.delete("/delete/:id", Authorization.authorizeAdmin, destroyUser);


module.exports = router;