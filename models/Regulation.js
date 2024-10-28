const mongoose = require('mongoose');

const regulationSchema = new mongoose.Schema({
  batch: { type: String, required: true },
  year: { type: String, required: true },  
  regulation: { type: String, required: true },
  semester: { type: String, required: true },  
});

module.exports = mongoose.model('Regulation', regulationSchema);