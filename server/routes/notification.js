const express = require("express");
const getNotifications = require("../controllers/notification");
const updateNotification = require("../controllers/notification/update");
const router = express.Router();


router.get("/:authUser", getNotifications);
router.post("/:authUser", updateNotification);


module.exports = router;