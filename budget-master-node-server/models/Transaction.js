const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        maxLength: 255,
    }
}, { timestamps: true } )

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    img: {
        type: String,
        required: false
    },
    assignedUser: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    assignedAccount: {
        type: mongoose.SchemaTypes.ObjectId,
    }  
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;