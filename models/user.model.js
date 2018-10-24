const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    website:String,

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
