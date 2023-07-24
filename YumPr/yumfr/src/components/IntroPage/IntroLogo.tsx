import React from 'react';
import logo from '../../assets/startlogo.png';
import '../styles/IntroLogo.css';

const IntroLogo = () => {
  return (
    <div className="intro-logo">
      <img src={logo} alt="Title Logo" className="gamelogo" />
    </div>
  );
};

export default IntroLogo;
