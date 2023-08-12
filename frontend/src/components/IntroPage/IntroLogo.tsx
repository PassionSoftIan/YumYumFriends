import React, { useEffect, useState } from 'react';
import logo from '../../assets/startlogo.png';
import '../styles/IntroLogo.css';

const IntroLogo = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(true);
    }, 500); // 0.5초 후에 로고를 나타낸다
  }, []);

  return (
    <div className={`intro-logo ${showLogo ? 'show' : ''}`}>
      <img src={logo} alt="Title Logo" className="logo" />
    </div>
  );
};

export default IntroLogo;
