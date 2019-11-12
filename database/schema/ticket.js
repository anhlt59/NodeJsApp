let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    HT: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});