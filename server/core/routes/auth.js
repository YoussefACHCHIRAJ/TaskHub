const express = require('express');
const logIn = require('../../controllers/auth/logIn.js');
const logout = require('../../controllers/auth/logout.js');
const authorization = require('../authorization.js');
const register = require('../../controllers/auth/register.js');


const router = express.Router();

router.post("/login",authorization.loginPageAuth, logIn);
router.post('/register',authorization.loginPageAuth, register);
router.get("/logout", logout);

module.exports = router;