import React from 'react';
import logo from './assets/images/logo.jpeg';
import Routes from './routes/Routes';
import './styles/style.css';

const App = () => {
  return (
    <div>
      <div className="header-container">
        <img src={logo} alt="DriveShare" className="logo" />
        <h1 className="app-name">DriveShare</h1>
      </div>
      <Routes />
    </div>
  );
};

export default App;
