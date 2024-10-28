const Regulation = require('../models/Regulation');

// Add new regulation
exports.addRegulation = async (req, res) => {
  try {
    const regulations = req.body; // Expect an array
    console.log(regulations);
    const savedRegulations = await Regulation.insertMany(regulations);
    res.status(201).json(savedRegulations);
  }
  catch (err) {
    res.status(500).json({ message: 'Failed to add regulations', error: err.message });
  }
};


// Get all regulations in ascending order
exports.getAllRegulations = async (req, res) => {
  try {
    const regulations = await Regulation.find().sort({ regulation: 1 });
    res.status(200).json(regulations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch regulations', error: err.message });
  }
};
