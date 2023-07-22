const express = require('express');
const cors = require("cors");
const tasksRouter = require('./core/routes/tasks.js');
const authRouter = require('./core/routes/auth.js');
const memberRouter = require('./core/routes/member.js');
const teamRouter = require('./core/routes/team.js');
const profileRouter = require('./core/routes/profile.js');
const checkMember = require('./core/authentication.js');
const cookieParser = require('cookie-parser');
const authorization = require('./core/authorization.js');

const app = express();

/*  middelware */
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.set('view engine' , 'ejs')



/* ROUTES */
app.get("*", checkMember);
app.get("/",authorization.logedAuth,(req,res) => {
    res.render('index')
});

app.use('/tasks',authorization.logedAuth,tasksRouter);
app.use('/auth',authRouter);
app.use("/member",authorization.adminAuth,authorization.logedAuth,memberRouter);
app.use('/team',authorization.logedAuth,teamRouter);
app.use('/profile',authorization.logedAuth,profileRouter);

app.get("/about",authorization.logedAuth,(req,res) => {
    res.status(200).render('about')
});

app.use((req,res)=>{
    res.status(404).render('404');
});

module.exports = app;