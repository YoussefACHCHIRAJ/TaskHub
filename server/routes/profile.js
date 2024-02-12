const express = require("express");
const profile = require("../controllers/profile");

const router = express.Router();

router.get("/:id", profile);

module.exports= router;