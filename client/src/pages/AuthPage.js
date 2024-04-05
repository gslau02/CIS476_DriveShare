import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../utils/auth';

const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(formData);
      // Redirect to another page or show success message
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error.message);
    }
  };

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
