import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Custom CSS for styling

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idRollNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
      // const response = await fetch('http://localhost:5000/testing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg)
        // alert('Sign up successful');
        navigate('/');
      } else {
        setError(data.message || 'Error signing up');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1><center>Outcome-Based Education (Attainments)</center></h1><br></br>
          <h2>Sign Up</h2>
          <input
            className="form-input"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="form-input"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            className="form-input"
            name="idRollNo"
            type="text"
            value={formData.idRollNo}
            onChange={handleChange}
            placeholder="Roll No."
            required
          />
          <input
            className="form-input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Gmail"
            required
          />
          <input
            className="form-input"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <select
            className="form-input"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Faculty">Faculty</option>
          </select>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Sign Up
          </button>
          <div className="auth-links">
            <span>Registered already? </span><Link to="/">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
