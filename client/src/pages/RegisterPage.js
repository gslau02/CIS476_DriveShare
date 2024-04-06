import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityQuestion1: '',
    securityQuestion2: '',
    securityQuestion3: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate.push('/home');
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="text" name="securityQuestion1" value={formData.securityQuestion1} onChange={handleChange} placeholder="Security Question 1" />
        <input type="text" name="securityQuestion2" value={formData.securityQuestion2} onChange={handleChange} placeholder="Security Question 2" />
        <input type="text" name="securityQuestion3" value={formData.securityQuestion3} onChange={handleChange} placeholder="Security Question 3" />
        <button type="submit">Register</button>
      </form>
      <Link to="/auth">Go to Authentication</Link>
    </div>
  );
};

export default RegisterPage;
