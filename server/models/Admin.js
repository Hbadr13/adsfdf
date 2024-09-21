// userModul.js
const { Schema, model } = require('mongoose');

// const adminSchema = new Schema({
//     username: {
//         type: String,
//         require: true,
//     },
//     password: {
//         type: String,
//         require: true,
//     },
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     }
// });
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // This ensures uniqueness of the email field
    },
});
const Admin = model('admins', adminSchema);
module.exports = Admin;
