// LoginPage.tsx

import React from 'react';
import logo from '../assets/gametitle.png';
import '../style/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // Implement the logic for KakaoTalk login here
    // For example, you can use KakaoTalk SDK or API to handle the login process
    // After successful login, navigate to the '/main' route
    // This is just a placeholder function, you should replace it with your actual login implementation.
    console.log('KakaoTalk login clicked!');
    navigate('/main'); // 로그인 성공 후 '/main' 경로로 이동
  };

  return (
      <div className="login-page">
        <img src={logo} alt="Title Logo" className="gamelogo" />
        <button onClick={handleKakaoLogin}>KakaoTalk 소셜로그인 버튼</button>
      </div>
  );
};

export default LoginPage;
