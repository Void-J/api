const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    description: String,
    startingDate: Date,
    endingDate: Date,
    currency: Number,
    status: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Project', UserSchema);