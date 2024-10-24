import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios'; // For HTTP requests
import './Auth.css'; // Import the same CSS for consistent styling

const AddSubjects = () => {
  const [subjects, setSubjects] = useState([{ regulation: '', semester: '', courseName: '', courseCode: '' }]);
  const [regulationsData, setRegulationsData] = useState([]); // Store fetched regulations

  // Fetch the regulations from the backend when the component loads
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/regulations'); // Fetch the regulations
        setRegulationsData(response.data);
      } catch (error) {
        alert('Failed to fetch regulations. Please try again.');
      }
    };

    fetchRegulations(); // Call the function to fetch regulations
  }, []);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  // Add new subject fields
  const addSubject = () => {
    setSubjects([...subjects, { regulation: '', semester: '', courseName: '', courseCode: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subjects', subjects);
      alert('Subject data saved successfully!');
      setSubjects([{ regulation: '', semester: '', courseName: '', courseCode: '' }]); // Reset the form
    } catch (error) {
      alert('Failed to save subject data. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Course Details</h3>
        {subjects.map((subj, index) => (
          <div key={index} className="regulation-inputs expanded-fields">
            {/* Select Regulation */}
            <div className="input-field">
              <label>Select Regulation</label>
              <select
                value={subj.regulation}
                onChange={(e) => handleInputChange(index, 'regulation', e.target.value)}
                required
                className="form-input"
              >
                <option value="">-- Select Regulation --</option>
                {/* Map fetched regulations */}
                {regulationsData
                  .map((regulation, i) => (
                    <option key={i} value={regulation.regulation}>
                      {regulation.regulation}
                    </option>
                  ))}
              </select>
            </div>

            {/* Select Semester */}
            <div className="input-field">
              <label>Select Semester</label>
              <select
                value={subj.semester}
                onChange={(e) => handleInputChange(index, 'semester', e.target.value)}
                required
                className="form-input"
                disabled={!subj.regulation} // Disable semester selection until regulation is chosen
              >
                <option value="">-- Select Semester --</option>
                {/* Find the selected regulation's semesters and map them */}
                {regulationsData
                  .filter((reg) => reg.regulation === subj.regulation)
                  .map((reg) =>
                    reg.semesters.map((semester, i) => (
                      <option key={i} value={semester}>
                        {semester}
                      </option>
                    ))
                  )}
              </select>
            </div>

            {/* Course Name */}
            <div className="input-field">
              <label>Enter Course Name</label>
              <input
                type="text"
                value={subj.courseName}
                onChange={(e) => handleInputChange(index, 'courseName', e.target.value)}
                required
                className="form-input"
                placeholder="e.g., Data Structures"
              />
            </div>

            {/* Course Code */}
            <div className="input-field">
              <label>Enter Course Code</label>
              <input
                type="text"
                value={subj.courseCode}
                onChange={(e) => handleInputChange(index, 'courseCode', e.target.value)}
                required
                className="form-input"
                placeholder="e.g., 20CS41001"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addSubject} className="add-button">
          <FaPlus /> <b>Add More</b>
        </button>
        <button type="submit" className="submit-button"><b>Submit</b></button>
      </form>
    </div>
  );
};

export default AddSubjects;
