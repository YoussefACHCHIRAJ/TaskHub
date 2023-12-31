const express = require('express');
const logIn = require('../../controllers/auth/logIn.js');
const register = require('../../controllers/auth/register.js');


const router = express.Router();

router.post("/login", logIn);
router.post('/register', register);

module.exports = router;