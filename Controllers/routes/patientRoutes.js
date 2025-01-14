const express = require('express');
const Patient = require('../Controllers/models/patient'); // Assuming the Patient model is in the models folder
const authenticate = require('../../middleware/authenticate'); // Authentication middleware
const Joi = require('joi'); // For validation

const router = express.Router();

// Validation function for patient data
const validatePatient = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    room: Joi.number().required(),
    diet: Joi.string().required(),
    allergies: Joi.string().optional(),
  });
  return schema.validate(data);
};

// Get all patients with optional pagination
router.get('/', authenticate, async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values for pagination
  try {
    const patients = await Patient.find()
      .limit(limit * 1) // Limit the number of results
      .skip((page - 1) * limit); // Skip results based on the current page
    const count = await Patient.countDocuments(); // Count total documents

    res.json({
      success: true,
      data: patients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching patients', error: err });
  }
});

// Add a new patient
router.post('/', authenticate, async (req, res) => {
  const { error } = validatePatient(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const patient = new Patient(req.body);
  try {
    await patient.save();
    res.status(201).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding patient', error: err });
  }
});

// Update an existing patient
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { error } = validatePatient(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: updatedPatient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating patient', error: err });
  }
});

// Delete a patient
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting patient', error: err });
  }
});

module.exports = router;
