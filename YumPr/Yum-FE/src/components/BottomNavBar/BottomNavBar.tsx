import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/BottomNavBar/BottomNavBar.css";

function BottomNavBar() {
  const location = useLocation();
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bottom-nav-bar">
      <Link to="/dex" className="bottom-nav-link">
        <button className="bottom-nav-button">
          <i className="fas fa-book"></i>
          <span>도감</span>
        </button>
      </Link>
      <Link to="/main" className="bottom-nav-link">
        <button className="bottom-nav-button">
          <i className="fas fa-home"></i>
          <span>홈</span>
        </button>
      </Link>
      <Link to="#" onClick={handleGoBack} className="bottom-nav-link">
        <button className="bottom-nav-button">
          <i className="fas fa-arrow-left"></i>
          <span>뒤로가기</span>
        </button>
      </Link>
    </div>
  );
}

export default BottomNavBar;
