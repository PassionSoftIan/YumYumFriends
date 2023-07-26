// NavBar.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar/NavBar.css";
import backButton from "../../assets/Buttons/BackButton.png"; // 파일 경로 수정

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="navbar">
      <div className="back-button" onClick={handleGoBack}>
        <img src={backButton} alt="Back" /> {/* 이미지로 뒤로가기 아이콘 사용 */}
      </div>
    </div>
  );
};

export default NavBar;
