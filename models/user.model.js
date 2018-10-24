const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    website: String,
    mail: String,
    phone: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);