const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hashingPassword } = require('../core/functions');
const validator = require("email-validator");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pleaze provide a valid name"],
        trim: [true, "Provide a valid name"]
    },
    email: {
        type: String,
        required: [true, "Pleaze provide a valid email."],
        trim: [true, "Pleaze Provide a valid password"],
        unique: [true, "This email already exist."],
        validate: {
            validator: value => {
                return validator.validate(value);
            },
            message: ()  => "This is not a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Pleaze provide a valid password."],
        minLength: [7, "The minimum length for the password is 7"]
    },
    post: {
        type: String,
    },
    team: {
        type: String,
        unique: true,
        required: [true, 'Pleaze provide a valid team named'],
        trim: true,
        minLength: 2
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
            throw {
                email: {
                    message: 'The email Does not match any account.'
                }
            }
        }

        const auth = await bcrypt.compare(password, member.password);
        if (!auth) {
            throw {
                password: {
                    message: 'Password incorrect.'
                }
            }
        }
        member.set('password', undefined);
        return member;
    } catch (error) {
        throw (error);
    }
}

memberSchema.statics.create = async function ({ name, email, password, team, post = 'admin' }) {

    try {
        if (password.length >= 7) password = await hashingPassword(password);

        const newMember = new this({ name, email, password, post, team });
        await newMember.save();
        
        return newMember;
    } catch (error) {
        if (error.message.includes('email_1 dup key') && !error.errors) {
            throw {
                email: {
                    message: 'The email you provided is already used.'
                }
            }
        }
        throw error.errors;
    }
}

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;