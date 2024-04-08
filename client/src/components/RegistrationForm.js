// RegistrationForm.js
import React, { useState } from 'react';
import Mediator from '../mediator/mediator';
import { registerUser } from '../utils/auth';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    securityQuestion1: { question: 'What is the name of your first pet?', answer: '' },
    securityQuestion2: { question: 'In what city were you born?', answer: '' },
    securityQuestion3: { question: 'What is the name of your favorite teacher?', answer: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('securityQuestion')) {
      const questionNumber = name.charAt(name.length - 1); // Extract the question number from the field name
      const updatedQuestion = { ...formData[name], answer: value };
      setFormData({ ...formData, [name]: updatedQuestion });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      Mediator.publish('registrationSuccess'); // Publish registration success event
    } catch (error) {
      alert('Registration failed');
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      </label>
      <p>{formData.securityQuestion1.question}</p>
      <input type="text" name="securityQuestion1" value={formData.securityQuestion1.answer} onChange={handleChange} placeholder="Answer" required />
      <p>{formData.securityQuestion2.question}</p>
      <input type="text" name="securityQuestion2" value={formData.securityQuestion2.answer} onChange={handleChange} placeholder="Answer" required />
      <p>{formData.securityQuestion3.question}</p>
      <input type="text" name="securityQuestion3" value={formData.securityQuestion3.answer} onChange={handleChange} placeholder="Answer" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
