// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../utils/auth';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     securityQuestion1: { question: 'What is the name of your first pet?', answer: '' },
//     securityQuestion2: { question: 'In what city were you born?', answer: '' },
//     securityQuestion3: { question: 'What is the name of your favorite teacher?', answer: '' }
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // For nested objects, create a copy of the nested object and update the specific field
//     if (name.startsWith('securityQuestion')) {
//       const questionNumber = name.charAt(name.length - 8); // Extract the question number from the field name
//       const updatedQuestion = { ...formData[`securityQuestion${questionNumber}`], answer: value };
//       setFormData({ ...formData, [`securityQuestion${questionNumber}`]: updatedQuestion });
//     } else {
//       // For other fields, update directly
//       setFormData({ ...formData, [name]: value });
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       navigate('/home');
//       alert('Registration successful');
//     } catch (error) {
//       alert('Registration failed');
//       console.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//         </label>
//         <p>{formData.securityQuestion1.question}</p>
//         <input type="text" name="securityQuestion1.answer" value={formData.securityQuestion1.answer} onChange={handleChange} placeholder="Answer" required />
//         <p>{formData.securityQuestion2.question}</p>
//         <input type="text" name="securityQuestion2.answer" value={formData.securityQuestion2.answer} onChange={handleChange} placeholder="Answer" required />
//         <p>{formData.securityQuestion3.question}</p>
//         <input type="text" name="securityQuestion3.answer" value={formData.securityQuestion3.answer} onChange={handleChange} placeholder="Answer" required />
//         <button type="submit">Register</button>
//       </form>
//       <Link to="/auth">Already have an account? Login</Link>
//     </div>
//   );
// };

// export default RegisterPage;


// RegisterPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import Mediator from '../mediator/mediator';

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
