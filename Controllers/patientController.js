const Patient = require('./models/Patient');

exports.getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.createPatient = async (req, res) => {
  const { name, room, diet, allergies } = req.body;
  const newPatient = new Patient({ name, room, diet, allergies });
  await newPatient.save();
  res.status(201).json(newPatient);
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedPatient);
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  await Patient.findByIdAndDelete(id);
  res.json({ message: 'Patient deleted' });
};
