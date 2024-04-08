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
            alert('Welcome back!');
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
