const express = require('express');
const Authorization = require('../Authorization');
const tasks = require('../../controllers/tasks');
const createTask = require('../../controllers/tasks/create');
const deleteTask = require('../../controllers/tasks/delete');
const updateTask = require('../../controllers/tasks/update');

const router = express.Router();

router.get("/:id",tasks);

router.post("/create",Authorization.authorizeAdmin,createTask);

router.put("/update/:id",Authorization.authorizeAdmin,updateTask);

router.delete("/delete/:id",Authorization.authorizeAdmin,deleteTask);

module.exports = router;