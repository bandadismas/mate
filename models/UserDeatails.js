const mongoose = require('mongoose');


const UserDetailsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: String,
    city: String,
    country: String
}, {timestamps: true});

module.exports = mongoose.model("UserDetails", UserDetailsSchema);