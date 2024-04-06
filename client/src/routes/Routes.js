// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from '../pages/RegisterPage';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
