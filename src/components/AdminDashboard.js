import React, { useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { UserContext } from '../UserContext';
import './Auth.css';

function AdminDashboard() {
  const { userData, setUserData } = useContext(UserContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state
  const navigate = useNavigate();
  const handleLogout = () => {
    setUserData(null);
    navigate('/');
  };
  // Toggle the sidebar collapse/expand
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={isSidebarCollapsed ? 'sidebar collapsed' : 'sidebar'}>
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="collapse-icon">
            {isSidebarCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>
        <ul>
          <li><a href="/admin/add-regulations"><i className="icon">📜</i> <span>Add Regulation</span></a></li>
          <li><a href="/admin/add-subjects"><i className="icon">📘</i> <span>Add Subjects</span></a></li>
          <li><a href="/admin/add-outcomes"><i className="icon">📊</i> <span>Add Course Outcomes</span></a></li>
          <li><a href="/admin/define-rubrics"><i className="icon">📏</i> <span>Define Rubrics</span></a></li>
          <li><a href="/admin/fetch-assessment"><i className="icon">📈</i> <span>Fetch Attainments Data</span></a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <button className="logout-button" onClick={handleLogout}><b>Logout</b></button>

        <h2>Welcome, { userData } !</h2> 
        <Outlet /> {/* This is where the routed components will appear */}
      </div>
    </div>
  );
}

export default AdminDashboard;
