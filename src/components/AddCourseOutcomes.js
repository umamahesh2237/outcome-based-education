import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './Auth.css';

const AddCourseOutcomes = () => {
  const [courseOutcomes, setCourseOutcomes] = useState([
    { regulation: '', semester: '', courseName: '', courseCode: '', courseOutcomes: ['', '', '', '', '', ''], rubricId: '' },
  ]);
  const [courseNames, setCourseNames] = useState([]); // State to hold course names
  const [rubrics, setRubrics] = useState([]); // State to hold rubrics

  // Fetch course names and rubrics on component mount
  useEffect(() => {
    const fetchRubrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rubrics');
        setRubrics(response.data);
      } catch (error) {
        console.error('Error fetching rubrics:', error);
      }
    };

    const fetchCourseNames = async (regulation, semester) => {
      // Simulate fetching course names based on regulation and semester
      if (regulation && semester) {
        const response = await axios.get(`http://localhost:5000/api/courses?regulation=${regulation}&semester=${semester}`);
        setCourseNames(response.data);
      } else {
        setCourseNames([]); // Clear course names if regulation or semester is not selected
      }
    };

    fetchRubrics();
    // You could call fetchCourseNames when regulation or semester changes
  }, []);

  // Handle regulation and semester selection
  const handleRegulationAndSemesterChange = (index, field, value) => {
    handleInputChange(index, field, value);
    if (field === 'regulation' || field === 'semester') {
      const regulation = courseOutcomes[index].regulation;
      const semester = courseOutcomes[index].semester;
      //fetchCourseNames(regulation, semester);
    }
  };

  // Handle input change for the first panel
  const handleInputChange = (index, field, value) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index][field] = value;

    // Auto-fill course code based on course name selection
    if (field === 'courseName') {
      const selectedCourse = courseNames.find(course => course.name === value);
      updatedOutcomes[index].courseCode = selectedCourse ? selectedCourse.code : '';
    }

    setCourseOutcomes(updatedOutcomes);
  };

  // Handle form submission for course outcomes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/course-outcomes', courseOutcomes);
      alert('Course Outcome data saved successfully!');
      setCourseOutcomes([{ regulation: '', semester: '', courseName: '', courseCode: '', courseOutcomes: ['', '', '', '', '', ''], rubricId: '' }]); // Reset the form
    } catch (error) {
      alert('Failed to save course outcome data. Please try again.');
    }
  };

  // Handle rubric mapping in the second panel
  const handleRubricMapping = (index, rubricId) => {
    const updatedOutcomes = [...courseOutcomes];
    updatedOutcomes[index].rubricId = rubricId;
    setCourseOutcomes(updatedOutcomes);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="regulation-form">
        <h3>Add Course Outcomes</h3>
        {courseOutcomes.map((outcome, index) => (
          <div key={index} className="regulation-inputs expanded-fields">
            {/* First row: Select Regulation, Semester, Course Name, Course Code */}
            <div className="flex-container">
              <div className="input-field">
                <label>Select Regulation</label>
                <select
                  value={outcome.regulation}
                  onChange={(e) => handleRegulationAndSemesterChange(index, 'regulation', e.target.value)}
                  required
                  className="form-input"
                >
                  <option value=""> Select </option>
                  <option value="AR16">AR16</option>
                  <option value="AR18">AR18</option>
                  <option value="AR20">AR20</option>
                  <option value="AR22">AR22</option>
                </select>
              </div>

              <div className="input-field">
                <label>Select Semester</label>
                <select
                  value={outcome.semester}
                  onChange={(e) => handleRegulationAndSemesterChange(index, 'semester', e.target.value)}
                  required
                  className="form-input"
                >
                  <option value=""> Select </option>
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

              <div className="input-field">
                <label>Select Course Name</label>
                <select
                  value={outcome.courseName}
                  onChange={(e) => handleInputChange(index, 'courseName', e.target.value)}
                  required
                  className="form-input"
                >
                  <option value=""> Select </option>
                  {courseNames.map((course, i) => (
                    <option key={i} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Course Code</label>
                <input
                  type="text"
                  value={outcome.courseCode}
                  readOnly
                  className="form-input"
                  placeholder="Course Code will be auto-filled"
                />
              </div>
            </div>

            {/* Second row: Course Outcomes fields, full width */}
            <div className="course-outcomes-container">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="input-field full-width">
                  <label>Course outcome {i + 1}</label>
                  <input
                    type="text"
                    value={outcome.courseOutcomes[i]}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        'courseOutcomes',
                        outcome.courseOutcomes.map((c, idx) => (idx === i ? e.target.value : c))
                      )
                    }
                    required
                    className="form-input"
                    placeholder={`Enter CO${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <br />
        {/* Second Panel: Add Rubrics and Map Outcomes */}
        <h3>Add Rubrics and Map Course Outcomes</h3>
        {courseOutcomes.map((outcome, index) => (
          <div key={index} className="regulation-inputs expanded-fields">
            {/* Rubric Selection */}
            <div className="input-field">
              <label>Select Rubric Considered</label>
              <select
                value={outcome.rubricId}
                onChange={(e) => handleRubricMapping(index, e.target.value)}
                required
                className="form-input"
              >
                <option value=""> Select Rubric </option>
                {rubrics.map((rubric, i) => (
                  <option key={i} value={rubric.id}>
                    {rubric.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Outcome Mapping */}
            <div className="input-field">
              <label>Select Course Outcome Mapped</label>
              <select
                value={outcome.courseOutcomes[0]} // Assuming the first course outcome is mapped
                onChange={(e) => handleInputChange(index, 'courseOutcomes', [e.target.value])}
                required
                className="form-input"
              >
                <option value=""> Select Course Outcome </option>
                {outcome.courseOutcomes.map((co, i) => (
                  <option key={i} value={co}>
                    {co}
                  </option>
                ))}
              </select>
            </div>
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
