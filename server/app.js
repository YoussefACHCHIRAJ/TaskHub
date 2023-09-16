const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const tasksRouter = require('./core/routes/tasks.js');
const authRouter = require('./core/routes/auth.js');
const memberRouter = require('./core/routes/member.js');
const profileRouter = require('./core/routes/profile.js');

const checkMember = require('./core/authentication.js');
const authorization = require('./core/authorization.js');

const defaultInfo = require('./controllers/defaultInfo.js');

const app = express();
/*  middelware */
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors())

/* ROUTES */
app.get("*", checkMember);


app.get("/defaultInfo/:name", defaultInfo);
app.use('/tasks',authorization.logedAuth,tasksRouter);
app.use('/auth',authRouter);
app.use("/member",authorization.logedAuth,memberRouter);
app.use('/profile',authorization.logedAuth,profileRouter);

app.use((req,res)=>{
    res.status(404).json({msg: 'uncorrect endpoint!'});
});

module.exports = app;