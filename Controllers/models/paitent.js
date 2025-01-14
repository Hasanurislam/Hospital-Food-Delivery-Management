const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  name: { type: String, required: true },
  room: { type: Number, required: true },
  diet: { type: String, required: true },
  allergies: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
