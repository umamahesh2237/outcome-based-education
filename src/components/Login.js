import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  //const [setApidata]=useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //const {setName} = useName();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      //setApidata(data);
      if (response.ok) {
        alert('Login successful');     
        if (data.role === 'Admin') {
          console.log("Login response data:", data); // This should show if name is part of the response
          if (data.name) {
            navigate('/admin', { state: { name: data.name } });
          } else {
            console.warn('User name is missing in the response data');
          }
        }
      } else {
        setError('User ID / Password is incorrect');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error connecting to the server');
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Outcome-Based Education (Attainments)</h2>
          <b><center> LOGIN </center></b><br></br>
          <input
            className="form-input"
            name="userId"
            type="text"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Email"
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
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Login
          </button>
          <div className="auth-links">
            <span>New User? </span><Link to="/signup">Click here to register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;