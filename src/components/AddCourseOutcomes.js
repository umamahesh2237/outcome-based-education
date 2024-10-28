import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const AddCourseOutcomes = () => {
  const [courseOutcomes, setCourseOutcomes] = useState([
    { regulation: '', semester: '', courseName: '', courseCode: '', outcomes: ['', '', '', '', '', ''], rubrics: [{ rubric: '', mappedOutcomes: '', totalMarks: '' }] }
  ]);
  const [regulations, setRegulations] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courseNames, setCourseNames] = useState([]);

  // Fetch regulations on component mount
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/regulations');
        setRegulations(response.data.sort((a, b) => a.name.localeCompare(b.name))); // Sort regulations in ascending order
      } catch (error) {
        console.error('Error fetching regulations:', error);
      }
    };
    fetchRegulations();
  }, []);

  // Fetch semesters based on selected regulation
  const fetchSemesters = async (regulation) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/regulations?regulation=${semesters}`);
      setSemesters(response.data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  // Fetch courses based on selected regulation and semester
  const fetchCourses = async (regulation, semester) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses?regulation=${regulation}&semester=${semester}`);
      setCourseNames(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle changes for regulation and semester
  const handleRegulationChange = (index, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].regulation = value;
    updatedOutcomes[index].semester = '';
    updatedOutcomes[index].courseName = '';
    updatedOutcomes[index].courseCode = '';
    setCourseOutcomes(updatedOutcomes);
    fetchSemesters(value);
  };

  const handleSemesterChange = (index, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].semester = value;
    updatedOutcomes[index].courseName = '';
    updatedOutcomes[index].courseCode = '';
    setCourseOutcomes(updatedOutcomes);
    fetchCourses(courseOutcomes[index].regulation, value);
  };

  const handleCourseNameChange = (index, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].courseName = value;
    const selectedCourse = courseNames.find(course => course.name === value);
    updatedOutcomes[index].courseCode = selectedCourse ? selectedCourse.code : '';
    setCourseOutcomes(updatedOutcomes);
  };

  const handleOutcomeChange = (index, outcomeIndex, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].outcomes[outcomeIndex] = value;
    setCourseOutcomes(updatedOutcomes);
  };

  const handleRubricChange = (index, rubricIndex, field, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].rubrics[rubricIndex][field] = value;
    setCourseOutcomes(updatedOutcomes);
  };

  const addMoreRubric = (index) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].rubrics.push({ rubric: '', mappedOutcomes: '', totalMarks: '' });
    setCourseOutcomes(updatedOutcomes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/course-outcomes', courseOutcomes);
      alert('Course Outcomes data saved successfully!');
      setCourseOutcomes([{ regulation: '', semester: '', courseName: '', courseCode: '', outcomes: ['', '', '', '', '', ''], rubrics: [{ rubric: '', mappedOutcomes: '', totalMarks: '' }] }]);
    } catch (error) {
      console.error('Failed to save course outcome data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Course Outcomes</h3>
        {courseOutcomes.map((outcome, index) => (
          <div key={index} className="regulation-inputs">
            {/* Panel 1 Inputs */}
              <div className="input-field">
                <label>Select Regulation</label>
                <select
                  value={outcome.regulation}
                  onChange={(e) => handleRegulationChange(index, e.target.value)}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  {regulations.map((reg, i) => (
                    <option key={i} value={reg.name}>{reg.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Select Semester</label>
                <select
                  value={outcome.semester}
                  onChange={(e) => handleSemesterChange(index, e.target.value)}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  {semesters.map((sem, i) => (
                    <option key={i} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Select Course Name</label>
                <select
                  value={outcome.courseName}
                  onChange={(e) => handleCourseNameChange(index, e.target.value)}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  {courseNames.map((course, i) => (
                    <option key={i} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Course Code</label>
                <input type="text" value={outcome.courseCode} readOnly className="form-input" />
              </div>
            <div className="regulation-inputs">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="input-field full-width">
                  <label>Course Outcome {i + 1}</label>
                  <input
                    type="text"
                    value={outcome.outcomes[i]}
                    onChange={(e) => handleOutcomeChange(index, i, e.target.value)}
                    className="form-input"
                    placeholder={`Enter CO${i + 1}`}
                    required={i < 5}
                  />
                </div>
              ))}
            </div>

            {/* Panel 2 Inputs: Rubrics */}
            <h3>Add Rubrics | Map with Outcomes</h3>
            {outcome.rubrics.map((rubric, rubricIndex) => (
              <div key={rubricIndex} className="regulation-inputs expanded-fields">
                <div className="input-field">
                  <label>Enter Rubric</label>
                  <input
                    type="text"
                    value={rubric.rubric}
                    onChange={(e) => handleRubricChange(index, rubricIndex, 'rubric', e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="input-field">
                  <label>Course Outcomes Mapped</label>
                  <input
                    type="text"
                    value={rubric.mappedOutcomes}
                    onChange={(e) => handleRubricChange(index, rubricIndex, 'mappedOutcomes', e.target.value)}
                    placeholder="e.g., CO1, CO2"
                    required
                    className="form-input"
                  />
                </div>

                <div className="input-field">
                  <label>Total Marks Allotted</label>
                  <input
                    type="number"
                    value={rubric.totalMarks}
                    onChange={(e) => handleRubricChange(index, rubricIndex, 'totalMarks', e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addMoreRubric(index)} className="add-button">
            <FaPlus /> <b>Add More</b>
            </button>
          </div>
        ))}

        <button type="submit" className="submit-button">
          <b>Submit</b>
        </button>
      </form>
    </div>
  );
};

export default AddCourseOutcomes;