const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { hashingPassword } = require('../core/functions');
const validator = require("email-validator");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Pleaze provide a valid name"],
        unique: [true, "This name already exist."],
        trim: [true, "Provide a valid name"],
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
            message: () => "This is not a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Pleaze provide a valid password."],
        minLength: [7, "The minimum length for the password is 7"]
    },
    role: {
        type: String,
        required: [true, "Pleaze provide a role."],
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
}, { timestamps: true });

UserSchema.statics.login = async function (email, password) {
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

UserSchema.pre('save', async function (next) {
    this.password = await hashingPassword(this.password);
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;