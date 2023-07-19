const express = require('express');
const createMember = require('../../controllers/member');

const router = express.Router();

router.get("/create", (req, res) => {
    res.render("members");
})

router.post("/create",createMember);

module.exports = router;