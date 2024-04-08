// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSecurityQuestions, verifySecurityQuestions, updatePassword } from '../utils/auth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [verificationResult, setVerificationResult] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await getSecurityQuestions(email);
      setQuestions(response);
    } catch (error) {
      console.error('Error fetching security questions:', error);
    }
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    try {
      const response = await verifySecurityQuestions(email, answers);
      setVerificationResult(response.status);
      setVerificationMessage(response.message);
    } catch (error) {
      console.error('Error verifying answers:', error);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(email, newPassword);
      setVerificationResult(false);
      setVerificationMessage('');
      setNewPassword('');
      navigate('/auth');
      alert('Password updated successfully. Please login in with your new password.');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Password update failed');
    }
  };

  return (
    <div>
      {questions.length === 0 ? (
        <form onSubmit={handleSubmitEmail} className='form-container'>
          <h2>Forgot Password</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button type="submit">Recover Password</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitAnswers}  className='form-container'>
            {questions.map((question, index) => (
            <div key={question._id}>
                <p>{question}</p>
                <input
                type="text"
                onChange={(e) => handleChange(e, index)}
                required
                />
            </div>
            ))}
            <button type="submit">Submit Answers</button>
            {verificationMessage && <p>{verificationMessage}</p>}
        </form>
      )}
      {verificationResult && (
        <div>
            <form onSubmit={handleSubmitNewPassword} className='form-container'>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
            <button type="submit">Update Password</button>
            </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
