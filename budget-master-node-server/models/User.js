const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 128,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;