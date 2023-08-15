import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar/NavBar.css";
import backButton from "../../assets/Buttons/Back.png";
// import useImageSrc from "../../hooks/useImage/useImageSrc";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const ourImageSrc = useImageSrc();

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
    </div>
  ) : null;
};

export default NavBar;
