import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import './Auth.css';

const AddCourseOutcomes = () => {
  const [regulation, setRegulation] = useState('');
  const [semester, setSemester] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseId, setCourseId] = useState(''); // Store the selected course ID
  const [regulationsData, setRegulationsData] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState(Array(6).fill(''));
  const [rubrics, setRubrics] = useState([{ rubricId: '', mappedOutcomes: '', totalMarks: 0 }]);

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/regulations/uniqueRegulations');
        setRegulationsData(response.data);
      } catch (error) {
        console.error('Failed to fetch unique regulations:', error);
        alert('Failed to fetch regulations. Please try again.');
      }
    };
    fetchRegulations();
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      if (regulation) {
        try {
          const response = await axios.get(`http://localhost:5000/api/regulations/semesters/${regulation}`);
          setSemesterOptions(response.data);
        } catch (error) {
          console.error('Failed to fetch semesters:', error);
          alert('Failed to fetch semesters. Please try again.');
        }
      }
    };
    fetchSemesters();
  }, [regulation]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (regulation && semester) {
        try {
          const response = await axios.get(`http://localhost:5000/api/courses/${regulation}/${semester}`);
          setCourseOptions(response.data); // Store _id along with courseName and courseCode
        } catch (error) {
          console.error('Failed to fetch courses:', error);
          alert('Failed to fetch courses. Please try again.');
        }
      }
    };
    fetchCourses();
  }, [regulation, semester]);

  const handleRegulationChange = (value) => {
    setRegulation(value);
    setSemester('');
    setCourseName('');
    setCourseCode('');
    setCourseId(''); // Reset course ID
    setSemesterOptions([]);
    setCourseOptions([]);
  };

  const handleSemesterChange = (value) => {
    setSemester(value);
    setCourseName('');
    setCourseCode('');
    setCourseId(''); // Reset course ID
  };

  const handleCourseNameChange = (value) => {
    const selectedCourse = courseOptions.find((course) => course.courseName === value);
    setCourseName(value);
    setCourseCode(selectedCourse ? selectedCourse.courseCode : '');
    setCourseId(selectedCourse ? selectedCourse._id : ''); // Store the course _id
  };

  const handleCourseOutcomeChange = (index, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index] = value;
    setCourseOutcomes(updatedOutcomes);
  };

  const handleRubricChange = (index, field, value) => {
    const updatedRubrics = [...rubrics];
    updatedRubrics[index][field] = field === 'totalMarks' ? parseInt(value, 10) : value;
    setRubrics(updatedRubrics);
  };

  const addMoreRubric = () => {
    setRubrics([...rubrics, { rubricId: '', mappedOutcomes: '', totalMarks: 0 }]);
  };

  const resetForm = () => {
    setCourseOutcomes(Array(6).fill(''));
    setRubrics([{ rubricId: '', mappedOutcomes: '', totalMarks: 0 }]);
    setRegulation('');
    setSemester('');
    setCourseName('');
    setCourseCode('');
    setCourseId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regulation || !semester || !courseId || courseOutcomes.some(co => !co.trim())) {
      alert('Please fill out all required fields.');
      return;
    }

    const courseOutcomesData = {
      course: courseId, // Use courseId instead of course details
      courseOutcomes: courseOutcomes.filter(outcome => outcome.trim() !== ''),
      rubricMapping: rubrics.map(rubric => ({
        rubricId: rubric.rubricId,
        mappedOutcomes: rubric.mappedOutcomes.split(',').map(co => co.trim()),
        totalMarks: rubric.totalMarks,
      })),
    };

    try {
      await axios.post('http://localhost:5000/api/course-outcomes/add', courseOutcomesData);
      alert('Course outcomes saved successfully!');
      resetForm();
    } catch (error) {
      console.error('Failed to save course outcomes:', error.response || error);
      alert('Failed to save course outcomes. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Course Outcomes</h3>
        <hr />
        <div className="regulation-inputs">
          <div className="input-field">
            <label>Select Regulation</label>
            <select
              value={regulation || ''}
              onChange={(e) => handleRegulationChange(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select</option>
              {regulationsData.map((reg, i) => (
                <option key={i} value={reg.regulation}>{reg.regulation}</option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Select Semester</label>
            <select
              value={semester || ''}
              onChange={(e) => handleSemesterChange(e.target.value)}
              required
              className="form-input"
              disabled={!semesterOptions.length}
            >
              <option value="">Select</option>
              {semesterOptions.map((sem, i) => (
                <option key={i} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Select Course Name</label>
            <select
              value={courseName || ''}
              onChange={(e) => handleCourseNameChange(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select</option>
              {courseOptions.map((course, i) => (
                <option key={i} value={course.courseName}>{course.courseName}</option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Course Code</label>
            <input type="text" value={courseCode || ''} readOnly className="form-input" />
          </div>
        </div>

        {courseOutcomes.map((outcome, i) => (
          <div key={i} className="input-field">
            <label>Course Outcome {i + 1}</label>
            <input
              type="text"
              value={outcome || ''}
              onChange={(e) => handleCourseOutcomeChange(i, e.target.value)}
              className="form-input"
              placeholder={`Enter CO${i + 1}`}
            />
          </div>
        ))}

        <h3>Add Rubrics | Map with Outcomes</h3>
        <hr />
        {rubrics.map((rubric, rubricIndex) => (
          <div key={rubricIndex} className="regulation-inputs expanded-fields">
            <div className="input-field">
              <label>Enter Rubric</label>
              <input
                type="text"
                value={rubric.rubricId || ''}
                onChange={(e) => handleRubricChange(rubricIndex, 'rubricId', e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="input-field">
              <label>Course Outcomes Mapped</label>
              <input
                type="text"
                value={rubric.mappedOutcomes || ''}
                onChange={(e) => handleRubricChange(rubricIndex, 'mappedOutcomes', e.target.value)}
                placeholder="e.g., CO1, CO2"
                required
                className="form-input"
              />
            </div>

            <div className="input-field">
              <label>Total Marks Allotted</label>
              <input
                type="number"
                value={rubric.totalMarks || 0}
                onChange={(e) => handleRubricChange(rubricIndex, 'totalMarks', e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addMoreRubric} className="add-button">
          <FaPlus /> <b>Add More</b>
        </button>
        <button type="submit" className="submit-button"><b>Submit</b></button>
      </form>
    </div>
  );
};

export default AddCourseOutcomes;