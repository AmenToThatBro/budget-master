const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    accountNumber: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: false,
    }
}, { timestamps: true })

const accountTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;