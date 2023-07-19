const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pleaze provide a name for the member"],
    },
    email: {
        type: String,
        required: [true, "Pleaze provide an email for the member"],
        unique: [true, "this email already exist."],
    },
    password: {
        type: String,
        required: [true, "Pleaze provide a password for the member"],
        trim: true,
        minLength: [7, "Minimum length for the password is 7"]
    },
    post: {
        type: String,
        required: [true, "Pleaze provide a post for the member"],
    },
    team: {
        type: String,
        required: [true, "Pleaze provide a team for the member"],
    },
    tasks: {
        type: Array,
        default: []
    },
}, { timestamps: true });

memberSchema.statics.login = async function (email, password) {
    try {
        let member = await this.findOne({ email });

        if (!member) {
            throw new Error("email: Email does not match any account");
        }

        const auth = await bcrypt.compare(password, member.password);
        if (!auth) {
            throw new Error("password: Email or password incorrect");
        }
        member = member.toObject();
        delete member.password;
        return member;
    } catch (error) {
        throw new Error(`login failed: ${error.message}`);
    }
}

memberSchema.statics.create = async function ({ name, email, password, post, team }) {

    try {
        const slate = await bcrypt.genSalt();

        if (!slate) throw new Error("can not generate a slate");
        console.log('slate', slate);

        const hashPassword = await bcrypt.hash(password, slate)

        if (!hashPassword) throw new Error("can not hash the password");
        console.log('password hashing', hashPassword);

        const newMember = new this({ name, email, password: hashPassword, post, team })
        await newMember.save();
        return newMember;
    } catch (error) {
        throw new Error(`create failed: ${error.message}`);
    }
}

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;