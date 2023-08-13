import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar/NavBar.css";
import backButton from "../../assets/Buttons/Back.png";
import useImageSrc from "../../hooks/useImage/useImageSrc";

interface NavBarProps {
  nickname?: string;
  meal?: number; // meal 변수의 타입을 숫자로 지정
}

const NavBar: React.FC<NavBarProps> = ({ nickname, meal = 3 }) => {
  // meal 변수의 기본값을 3으로 설정
  const navigate = useNavigate();
  const location = useLocation();
  const ourImageSrc = useImageSrc();

  const handleGoBack = () => {
    navigate(-1);
  };

  const hideNavBarOnIntroPageOrLoginPage =
    location.pathname === "/login" || location.pathname === "/";

  return !hideNavBarOnIntroPageOrLoginPage ? (
    <div className="navbar">
      <div className="back-button" onClick={handleGoBack}>
        <img src={backButton} alt="Back" />
      </div>
      <div className="user-profile">
        <div className="user-icon">
          {ourImageSrc && <img src={ourImageSrc} alt="Profile" />}
        </div>
        <div className="user-nickname">
          <div className="icon-and-nickname">
            <span className="nick">{nickname}</span>
            {Array.from({ length: meal }, (_, index) => (
              <span key={index} className="icon">
                🥄
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default NavBar;
