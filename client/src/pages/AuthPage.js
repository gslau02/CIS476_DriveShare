import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser, verifySession } from '../utils/auth';

const AuthPage = () => {
  // Define state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get navigate function from useNavigate hook
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user with form data
      await authenticateUser(formData);
      // Redirect to home page after successful login
      navigate('/home');
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
      console.error(error.message);
    }
  };

  // Check session on component mount
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      // Verify session with session token
      verifySession(sessionToken)
        .then((response) => {
          if (response.userId) {
            alert('Welcome back!');
            // Redirect to home page if session is valid
            navigate('/home');
          } else {
            localStorage.removeItem('sessionToken');
          }
        })
        .catch(() => {
          localStorage.removeItem('sessionToken');
        });
    }
  }, [navigate]);

  // Render the component
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Login to Account</h2>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
        <Link className='link' to="/register">Not a user? Register</Link>
        <Link className='link' to="/forgotPassword">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default AuthPage;
