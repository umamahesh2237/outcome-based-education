import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import './Auth.css';

function AdminDashboard() {
  const [firstName, setFirstName] = useState(''); // Store the first name
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch user's first name from backend
  useEffect(() => {
    if (location.state && location.state.name) {
      setFirstName(location.state.name);
    } else {
      console.warn("User name not found in location.state");
    }
  }, [location.state]);
  const handleLogout = () => {
    navigate('/');
  };
  // Toggle the sidebar collapse/expand
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="collapse-button">
            {isSidebarCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>
        <ul>
          {/* Add links to all the components */}
          <li><Link to="/admin/add-regulations">Add Regulations</Link></li>
          <li><Link to="/admin/add-subjects">Add Course Details</Link></li>
          <li><Link to="/admin/add-outcomes">Add Course Outcomes</Link></li>
          <li><Link to="/admin/define-rubrics">Define Rubrics</Link></li>
          <li><Link to="/admin/fetch-assessment">Fetch Course Assessment Data</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <button className="logout-button" onClick={handleLogout}><b>Logout</b></button>

        <h2>Welcome, {firstName}!</h2> 
        <Outlet /> {/* This is where the routed components will appear */}
      </div>
    </div>
  );
}

export default AdminDashboard;
