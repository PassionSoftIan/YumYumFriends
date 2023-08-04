import React from "react";
import Cloud from "../components/Animation/Cloud";
import useConfetti from "../hooks/Animations/useConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti(
    ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
    80,
    150
  );

  const handleSinglePlayerGame = () => {
    console.log("단일 플레이어 게임 시작");
    triggerConfetti();
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

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleSelect = () => {
    navigate("/select");
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
          <Button onClick={handleSettings}>설정</Button>
          <Button onClick={handleSelect}>대표냠</Button>
        </div>
      </div>
      </div>
  );
};

export default MainPage;
