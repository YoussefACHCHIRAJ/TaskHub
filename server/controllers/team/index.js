const Team = require("../../model/team")
const Member = require("../../model/member")
const { decodedToken, createToken, maxAge } = require("../../core/functions");
const Tasks = require("../../model/tasks");

const team = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) throw new Error("can not catch any token");

        const tokenDecoded = await decodedToken(token);

        if (!tokenDecoded) throw new Error("can not find admin id");

        const team = await Team.findOne({ members: { $in: [tokenDecoded.id] } })
            || await Team.findOne({ adminId: tokenDecoded.id });

        const members = await Promise.all(team.members.map(async member => {
            const memberData = await Member.findById(member);
            memberData.set('password', undefined);
            return memberData;
        })) || [];

        const date = new Date();
        date.setHours(0, 0, 0, 0);
        
        const tasks = await Promise.all(team.tasks.map(async task => {

            try {
                const taskData = await Tasks.findOne({
                    _id: task,
                    dateStart: {
                        $gte: date,
                        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                    },
                });

                if (!taskData) return null;

                taskData.set('password', undefined);

                return taskData;
            } catch (error) {
                console.log('error:', error.message);
                return null;
            }
        })) || [];
        const filterdTasks = tasks.filter(task => task !== null);
        console.log('tasks: ', tasks);

        res.status(200).render("./team", { team, members, tasks: filterdTasks });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = team;