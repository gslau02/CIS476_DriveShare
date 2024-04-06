import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser, verifySession } from '../utils/auth';

const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(formData);
      navigate('/home');
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
      console.error(error.message);
    }
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      verifySession(sessionToken)
        .then((response) => {
          if (response.userId) {
            localStorage.setItem('userId', response.userId);
            navigate('/home');
            alert('Welcome back!');
          } else {
            localStorage.removeItem('sessionToken');
          }
        })
        .catch(() => {
          localStorage.removeItem('sessionToken');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Go to Registration</Link>
    </div>
  );
};

export default AuthPage;
