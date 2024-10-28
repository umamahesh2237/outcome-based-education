import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const AddSubjects = () => {
  const [regulation, setRegulation] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState([{ courseName: '', courseCode: '' }]);
  const [regulationsData, setRegulationsData] = useState([]); // Store unique regulations
  const [semesterOptions, setSemesterOptions] = useState([]); // Store semesters for selected regulation

  // Fetch the unique regulations from the backend
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/regulations/uniqueRegulations'); // Fetch unique regulations
        setRegulationsData(response.data);
      } catch (error) {
        console.error('Failed to fetch unique regulations:', error);
        alert('Failed to fetch regulations. Please try again.');
      }
    };

    fetchRegulations();
  }, []);

  // Fetch semesters for the selected regulation
  useEffect(() => {
    const fetchSemesters = async () => {
      if (regulation) {
        try {
          const response = await axios.get(`http://localhost:5000/api/regulations/semesters/${regulation}`);
          setSemesterOptions(response.data);
        } catch (error) {
          console.error('Failed to fetch semesters:', error);
        }
      }
    };

    fetchSemesters();
  }, [regulation]);

  // Handle input change for regulation and semester
  const handleRegulationChange = (value) => {
    setRegulation(value);
    setSemester(''); // Reset semester when regulation changes
    setSemesterOptions([]); // Clear semesters
  };

  const handleSemesterChange = (value) => {
    setSemester(value);
  };

  // Handle input change for course details
  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  // Add new course fields (only course name and course code)
  const addCourse = () => {
    setCourses([...courses, { courseName: '', courseCode: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', courses);
    if (!regulation || !semester || courses.some(course => !course.courseName || !course.courseCode)) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Map each course to include regulation and semester
    const coursesData = courses.map((course) => ({
      regulation,
      semester,
      courseName: course.courseName,
      courseCode: course.courseCode,
    }));
  
    try {
      await axios.post('http://localhost:5000/api/courses/addCourse', { courses: coursesData });
      alert('Subject data saved successfully!');
      
      // Reset form
      setCourses([{ courseName: '', courseCode: '' }]);
      setRegulation('');
      setSemester('');
    } catch (error) {
      console.error('Failed to save subject data:', error.response || error);
      alert('Failed to save subject data. Please try again.');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Course Details</h3>
        
        {/* Select Regulation */}
        <div className="input-field">
          <label>Select Regulation</label>
          <select
            value={regulation}
            onChange={(e) => handleRegulationChange(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select</option>
            {regulationsData.map((reg, i) => (
              <option key={i} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* Static Semester Dropdown */}
        <div className="input-field">
          <label>Select Semester</label>
          <select
            value={semester}
            onChange={(e) => handleSemesterChange(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select</option>
            {semesterOptions.map((sem, i) => (
              <option key={i} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Course Details */}
        {courses.map((course, index) => (
          <div key={index} className="regulation-inputs">
            {/* Course Name */}
            <div className="input-field">
              <label>Enter Course Name</label>
              <input
                type="text"
                value={course.courseName}
                onChange={(e) => handleCourseChange(index, 'courseName', e.target.value)}
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
                value={course.courseCode}
                onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
                required
                className="form-input"
                placeholder="e.g., 20CS41001"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addCourse} className="add-button">
          <FaPlus /> <b>Add More</b>
        </button>
        <button type="submit" className="submit-button"><b>Submit</b></button>
      </form>
    </div>
  );
};

export default AddSubjects;