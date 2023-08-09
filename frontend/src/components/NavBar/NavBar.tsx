import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar/NavBar.css";
import backButton from "../../assets/Buttons/Back.png"; // 파일 경로 수정

interface NavBarProps {
  nickname?: string;
}

const NavBar: React.FC<NavBarProps> = ({ nickname }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  // IntroPage와 LoginPage에서는 NavBar를 숨기기 위한 조건 추가
  const hideNavBarOnIntroPageOrLoginPage =
    location.pathname === "/login" || location.pathname === "/";

  // 조건에 따라 NavBar를 렌더링
  return !hideNavBarOnIntroPageOrLoginPage ? (
    <div className="navbar">
      <div className="back-button" onClick={handleGoBack}>
        <img src={backButton} alt="Back" /> {/* 이미지로 뒤로가기 아이콘 사용 */}
      </div>
      <div className="user-nickname">
        {nickname} {/* Display the user's nickname here */}
      </div>
    </div>
  ) : null;
};

export default NavBar;
