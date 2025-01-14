const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  items: [{ type: String, required: true }], // Array of food items
  status: { type: String, default: 'Pending' }, // e.g., Pending, In Progress, Delivered
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
