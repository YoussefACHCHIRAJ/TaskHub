const express = require("express");
const profile = require("../../controllers/profile");

const router = express.Router();

router.get("/", profile);

module.exports= router;