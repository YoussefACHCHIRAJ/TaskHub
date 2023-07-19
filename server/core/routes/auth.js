const express = require('express');
const logIn = require('../../controllers/auth/logIn.js');
const logout = require('../../controllers/auth/logout.js');
const authorization = require('../authorization.js');


const router = express.Router();

router.get("/login",authorization.loginPageAuth, (req, res) => {
    res.render("./auth/login");
});
router.post("/login",authorization.loginPageAuth, logIn);
router.get("/logout", logout);

module.exports = router;