const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {
        type: String,required: true,
        enum: ["Male", "Female","Prefer not to say"]},
    bloodgroup: {type: String, required: true},
    dob: {type: Date, required: true},
    address: {type: String, required: true},
    phone: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

