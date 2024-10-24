import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  console.log(formData)
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [apidata,setApidata]=useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
      // const response = await fetch('http://localhost:5000/testing1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setApidata(data);
      console.log("this is data", data);
      if (response.ok) {
        alert('Login successful');
        alert(apidata);       
        if (data.role === 'Admin') {
          alert('admin');
          navigate('/admin',{state: data});
        } else if (data.role === 'Faculty') {
          navigate('/faculty');
        }
      } else {
        setError('User ID / Password is incorrect');
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
          <h2>Login</h2>
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
