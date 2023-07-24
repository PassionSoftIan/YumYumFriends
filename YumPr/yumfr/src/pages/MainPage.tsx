<<<<<<< HEAD
export {};
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/MainPage.css"; // 새로운 CSS 파일을 생성하여 여기에 스타일을 작성합니다.

const MainPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate를 가져옴

  const handleSinglePlayerGame = () => {
    console.log("단일 플레이어 게임 시작");
    navigate("/single"); // useNavigate로 페이지 이동 처리
  };

  const handleMultiPlayerGame = () => {
    console.log("다중 플레이어 게임 시작");
    navigate("/multi");
  };

  const handleCoopGame = () => {
    console.log("협동 플레이 게임 시작");
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
>>>>>>> 95bb8b7f77b03e9c1f99ecf9ac2bd81eae5d9751
