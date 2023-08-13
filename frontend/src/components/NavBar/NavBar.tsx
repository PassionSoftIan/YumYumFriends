import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar/NavBar.css";
import backButton from "../../assets/Buttons/Back.png";
import useImageSrc from "../../hooks/useImage/useImageSrc";

interface NavBarProps {
  nickname?: string;
  meal?: number;
}

const NavBar: React.FC<NavBarProps> = ({ nickname, meal = 3 }) => {
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

        <div className="icon-divider"></div>
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
