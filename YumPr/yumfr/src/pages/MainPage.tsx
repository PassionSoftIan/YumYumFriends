import React from "react";
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

  const handleCoopGame = () => {
    console.log("협동 플레이 게임 시작");
    navigate("/coop");
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={handleSinglePlayerGame} className="game-button">
          Single
        </button>
        <button onClick={handleMultiPlayerGame} className="game-button">
          Multi
        </button>
        <button onClick={handleCoopGame} className="game-button">
          협동 플레이 게임
        </button>
      </div>
    </div>
  );
};

export default MainPage;
