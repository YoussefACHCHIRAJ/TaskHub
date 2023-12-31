const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const tasksRouter = require('./core/routes/tasks.js');
const authRouter = require('./core/routes/auth.js');
const memberRouter = require('./core/routes/user.js');
const profileRouter = require('./core/routes/profile.js');
const teamRouter = require('./core/routes/team.js');

const Authorization = require('./core/Authorization.js');

const defaultInfo = require('./controllers/defaultInfo.js');

const app = express();
/*  middelware */
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors())

/* ROUTES */


app.get("/defaultInfo/:id", defaultInfo);

app.use('/auth', authRouter);
app.use('/tasks', Authorization.authenticateUser, tasksRouter);
app.use("/member", Authorization.authenticateUser, memberRouter);
app.use('/profile', Authorization.authenticateUser, profileRouter);
app.use("/team", Authorization.authenticateUser, Authorization.authorizeAdmin, teamRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'uncorrect endpoint!' });
});

module.exports = app;