// userModul.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
});

const User = model('users', userSchema);

module.exports = User;
