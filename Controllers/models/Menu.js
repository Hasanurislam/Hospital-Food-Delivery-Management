const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  dietaryRestrictions: { type: [String], default: [] }, 
});

module.exports = mongoose.model('Menu', menuSchema);
