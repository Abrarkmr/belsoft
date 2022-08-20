var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: Number,
    name: String,
    status: String,
    email: String,
    password: String,
    status: String
})

var userTable = mongoose.model('user', userSchema);

module.exports = userTable 