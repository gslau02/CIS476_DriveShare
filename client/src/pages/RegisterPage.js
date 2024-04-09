import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import Mediator from '../utils/mediator/mediator';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    navigate('/home');
    alert('Registration successful');
  };

  // Subscribe to registration success event
  Mediator.subscribe('registrationSuccess', handleRegistrationSuccess);

  return (
    <RegistrationForm />
  );
};

export default RegisterPage;
