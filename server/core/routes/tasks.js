const express = require('express');
const authorization = require('../authorization');
const tasks = require('../../controllers/tasks');
const createTask = require('../../controllers/tasks/create');
const deleteTask = require('../../controllers/tasks/delete');
const storeUpdatedTask = require('../../controllers/tasks/storeUpdated');

const router = express.Router();

router.get("/",tasks);

router.post("/create",authorization.adminAuth,createTask);

router.post("/update/:id",authorization.adminAuth,storeUpdatedTask);

router.delete("/delete/:id",authorization.adminAuth,deleteTask);

module.exports = router;