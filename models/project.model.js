const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    description: String,
    status:String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Project', UserSchema);
