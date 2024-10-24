import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AddSubjects from './components/AddSubjects';
import AddRegulation from './components/AddRegulation';
import AddCourseOutcomes from './components/AddCourseOutcomes';
// import DefineRubrics from './components/DefineRubrics';
// import FetchAssessmentData from './components/FetchAssessmentData';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />}>
            {/* Nested routes for Admin-related actions */}
            <Route path="add-regulations" element={<AddRegulation />} />
            <Route path="add-subjects" element={<AddSubjects />} />
            <Route path="add-outcomes" element={<AddCourseOutcomes />} />
            {/* <Route path="define-rubrics" element={<DefineRubrics />} />
            <Route path="fetch-assessment" element={<FetchAssessmentData />} /> */}
          </Route>
          <Route path="/faculty" element={<FacultyDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
