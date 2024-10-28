const express = require('express');
const Regulation = require('../models/Regulation');
const router = express.Router();

// POST route for adding regulations (already exists)
router.post('/addRegulation', async (req, res) => {
  const { regulations } = req.body;
  try {
    const savedRegulations = await Regulation.insertMany(regulations);
    res.status(200).json({ message: 'Regulations added successfully', data: savedRegulations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add regulations', error });
  }
});

// GET route to fetch unique regulations (NEW ROUTE)
router.get('/uniqueRegulations', async (req, res) => {
  try {
    const uniqueRegulations = await Regulation.distinct('regulation');
    const formattedRegulations = uniqueRegulations.map(reg => ({ regulation: reg }));
    res.json(formattedRegulations);
  } catch (error) {
    console.error('Error fetching unique regulations:', error);
    res.status(500).json({ message: 'Failed to fetch regulations' });
  }
});

// Fetch semesters related to a specific regulation
router.get('/semesters/:regulation', async (req, res) => {
  const { regulation } = req.params;
  try {
    // Find distinct semesters for the selected regulation
    const semesters = await Regulation.find({ regulation }).distinct('semester');
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch semesters for the selected regulation', error });
  }
});

module.exports = router;