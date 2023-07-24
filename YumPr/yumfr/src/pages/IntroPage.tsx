import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/startlogo.png";
import "../style/IntroPage.css";


const IntroPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // 버튼을 클릭했을 때 메인 페이지로 이동
    navigate('/main');
  };

  return (
    <div className="intro-page">
      <img src={logo} alt="Title Logo" className="logo" />

      <h1 className="caution-heading">주의</h1>
      <p className="caution-text">
        유아가 이 애플리케이션을 사용하는 동안, 부모님의 동반 및 관찰이 필요합니다. 부모님과 함께 사용하면서 즐거운 시간을 보내는 것을 권장드립니다.
      </p>
      <button onClick={handleButtonClick} className="caution-button">확인</button>
    </div>
  );
};

export default IntroPage;
