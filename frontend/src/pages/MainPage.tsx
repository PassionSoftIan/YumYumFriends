import React from "react";
import Cloud from "../components/Animation/Cloud";
import { useNavigate } from "react-router-dom";
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSinglePlayerGame = () => {
    console.log("단일 플레이어 게임 시작");
    navigate("/single");
  };

  const handleMultiPlayerGame = () => {
    console.log("다중 플레이어 게임 시작");
    navigate("/multi");
  };

  const handleProfile = () => {
    console.log("프로필");
    navigate("/profile");
  };

  return (
    <div className="main-container">
      <Cloud />
      <div className="center">
        <div className="button-container">
          <button
            onClick={handleSinglePlayerGame}
            className="game-button button-second btn"
          >
            <span>Single</span>
          </button>

          <button
            onClick={handleMultiPlayerGame}
            className="game-button button-second btn"
          >
            <span>Multi</span>
          </button>
          <button
            onClick={handleProfile}
            className="game-button button-second btn"
          >
            <span>프로필</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
