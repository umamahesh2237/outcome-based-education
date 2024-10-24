const express = require('express');
const Regulation = require('../models/Regulation');

const router = express.Router();

// POST: Add regulation data to the MongoDB
router.post('/addRegulation', async (req, res) => {
  console.log("naveen");
  const { regulations } = req.body; // Access the regulations array
  console.log(regulations);
  try {
    // Save multiple regulations at once
    const savedRegulations = await Regulation.insertMany(regulations);
    res.status(200).json({ message: 'Regulations added successfully', data: savedRegulations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add regulations', error });
  }
});

module.exports = router;
