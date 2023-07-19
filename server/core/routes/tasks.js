const express = require('express');
const authorization = require('../authorization');
const tasks = require('../../controllers/tasks');
const createTask = require('../../controllers/tasks/create');

const router = express.Router();

router.get("/",tasks)

router.get("/create",authorization.adminAuth,(req,res) => {
    res.render("tasks/create");
})
router.post("/create",createTask);

module.exports = router;