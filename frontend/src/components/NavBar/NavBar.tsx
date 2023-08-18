import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/NavBar/NavBar.module.css";
import backButton from "../../assets/Buttons/Back.png";
import settingIcon from "../../assets/Buttons/setting.png";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  const hideNavBarOnIntroPageOrLoginPage =
    location.pathname === "/login" || location.pathname === "/";

  return !hideNavBarOnIntroPageOrLoginPage ? (
    <div className={styles["navbar"]}>
      <div className={styles["back-button"]} onClick={handleGoBack}>
        <img src={backButton} alt="Back" />
      </div>
      <div>
        <img
          src={settingIcon}
          alt=""
          className={styles["settings"]}
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  ) : null;
};

export default NavBar;
