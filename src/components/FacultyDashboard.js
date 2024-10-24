// src/components/FacultyDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome Faculty</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default FacultyDashboard;
