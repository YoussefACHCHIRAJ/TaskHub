const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tasksRouter = require('./core/routes/tasks.js');
const authRouter = require('./core/routes/auth.js');
const memberRouter = require('./core/routes/member.js');
const teamRouter = require('./core/routes/team.js');
const checkMember = require('./core/authentication.js');
const cookieParser = require('cookie-parser');
const authorization = require('./core/authorization.js');

const app = express();

/*  middelware */
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine' , 'ejs')

dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

/* data base connect */

mongoose.connect(DB_URI , { useNewUrlParser: true, useUnifiedTopology: true})
.then(res => app.listen(PORT)).catch(err => console.log(err.message));

/* ROUTES */
app.get("*", checkMember);
app.get("/",(req,res) => {
    res.render('index')
});

app.use('/tasks',authorization.logedAuth,tasksRouter);
app.use('/auth',authRouter);
app.use("/member",authorization.adminAuth,authorization.logedAuth,memberRouter);
app.use('/team',authorization.logedAuth,teamRouter);

app.get("/about",authorization.logedAuth,(req,res) => {
    res.status(200).render('about')
});

app.use((req,res)=>{
    res.status(404).render('404');
});