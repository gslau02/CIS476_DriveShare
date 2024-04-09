// RegisterPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import Mediator from '../mediator/mediator';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Function to handle registration success
  const handleRegistrationSuccess = () => {
    navigate('/home');
    alert('Registration successful');
  };

  // Subscribe to registration success event
  Mediator.subscribe('registrationSuccess', handleRegistrationSuccess);

  // Render the registration form component
  return (
    <RegistrationForm />
  );
};

export default RegisterPage;
