const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const tasksRouter = require('./routes/tasks.js');
const authRouter = require('./routes/auth.js');
const memberRouter = require('./routes/user.js');
const profileRouter = require('./routes/profile.js');
const teamRouter = require('./routes/team.js');
const notificationRouter = require("./routes/notification.js");

const Authorization = require('./core/Authorization.js');

const defaultInfo = require('./controllers/defaultInfo.js');
const { Server } = require('socket.io');
const storeNotification = require('./controllers/notification/store.js');

const app = express();
/*  middelware */
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const realTimeFunctionality = server => {

    const users = new Map();
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", socket => {
        socket.on("log-in", userId => {

            if (userId) {
                users.set(userId, socket);
                io.emit("user-connected", Array.from(users.keys()));
            }
        });

        socket.on("new-task:store-notification", async (responsables) => {
            users.forEach((socketStored, userId) => {
                if (responsables.includes(userId))
                    socketStored.emit("refetch-notifications");
            }
            )
        });


        socket.on("disconnect", () => {
            users.forEach((socketStored, userId) => {
                if (socket === socketStored) users.delete(userId);
            });
            io.emit("user-disconnected", Array.from(users.keys()));
        })
    })
}

/* ROUTES */
app.get("/defaultInfo/:id", defaultInfo);
app.use('/auth', authRouter);
app.use('/tasks', Authorization.authenticateUser, tasksRouter);
app.use("/member", Authorization.authenticateUser, memberRouter);
app.use('/profile', Authorization.authenticateUser, profileRouter);
app.use("/team", Authorization.authenticateUser, Authorization.authorizeAdmin, teamRouter)
app.use("/notifications", Authorization.authenticateUser, notificationRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'uncorrect endpoint!' });
});

module.exports = { app, realTimeFunctionality };