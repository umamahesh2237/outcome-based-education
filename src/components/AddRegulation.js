import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios'; // For HTTP requests

function AddRegulation() {
  const [regulations, setRegulations] = useState([{ batch: '', year: '', regulation: '', semester: '' }]);

  // Handle change in input fields
  const handleInputChange = (index, field, value) => {
    const newRegulations = [...regulations];
    newRegulations[index][field] = value;
    setRegulations(newRegulations);
  };

  const addRegulation = () => {
    setRegulations([...regulations, { batch: '', year: '', regulation: '', semester: '' }]);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', regulations); // Log the data to see what is sent
  
    try {
      // Wrap the regulations array inside an object
      await axios.post('http://localhost:5000/api/regulations/addRegulation', { regulations });
      alert('Regulation data saved successfully!');
      setRegulations([{ batch: '', year: '', regulation: '', semester: '' }]);
    } catch (error) {
      console.error('Submission error:', error.response || error); // Log any errors
      alert('Failed to save regulation data. Please try again.');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Regulation</h3>
        {regulations.map((reg, index) => (
          <div key={index} className="regulation-inputs">
            <div className="input-field">
              <label>Enter Batch </label>
              <input
                type="text"
                placeholder="e.g. 2021-2025"
                value={reg.batch}
                onChange={(e) => handleInputChange(index, 'batch', e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Enter Academic Year </label>
              <input
                type="text"
                placeholder="e.g. 2024-2025"
                value={reg.year}
                onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Enter Regulation </label>
              <input
                type="text"
                placeholder="e.g. AR20"
                value={reg.regulation}
                onChange={(e) => handleInputChange(index, 'regulation', e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Enter Semester</label>
              <select
                className="form-input"
                value={reg.semester}
                onChange={(e) => handleInputChange(index, 'semester', e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="1-1">1-1</option>
                <option value="1-2">1-2</option>
                <option value="2-1">2-1</option>
                <option value="2-2">2-2</option>
                <option value="3-1">3-1</option>
                <option value="3-2">3-2</option>
                <option value="4-1">4-1</option>
                <option value="4-2">4-2</option>
              </select>
            </div>
          </div>
        ))}

        <button type="button" onClick={addRegulation} className="add-button">
          <FaPlus /> <b>Add More</b>
        </button>

        <button type="submit" className="submit-button"><b>Submit</b></button>
      </form>
    </div>
  );
}

export default AddRegulation;
