const express = require('express');
const authorization = require('../authorization');
const tasks = require('../../controllers/tasks');
const createTask = require('../../controllers/tasks/create');
const deleteTask = require('../../controllers/tasks/delete');
const updateTask = require('../../controllers/tasks/update');

const router = express.Router();

router.get("/:id",tasks);

router.post("/create",authorization.adminAuth,createTask);

router.put("/update/:id",authorization.adminAuth,updateTask);

router.delete("/delete/:id",authorization.adminAuth,deleteTask);

module.exports = router;