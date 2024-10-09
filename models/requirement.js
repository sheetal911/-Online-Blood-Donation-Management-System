const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
    userId: { type: String},
    reqId: { type: String, unique: true, required:true},
    name: {type: String, required: true},   
    bloodgroup: {type: String, required: true},
    phone: { type: String, required: true },
    hospitaloc: {type: String, required: true},
    units: {type: Number, required:true}
});

const requirement = mongoose.model('requirement', requirementSchema);

module.exports = requirement;

