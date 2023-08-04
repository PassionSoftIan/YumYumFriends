import React from "react";
import GetYum from "../components/SinglePage/GetYum";
import "./styles/GameClearPage.css";

const GameClearPage: React.FC = () => {
  // 여기서 랜덤으로 수집할 냠냠이를 정해줘야함
  // API요청 보내서 설정하자
  const targetYum = {
    name: "eggplant",
    type: "가지맨",
  };

  return (
    <div className="game-clear-page">
      <GetYum yum={targetYum} />
    </div>
  );
};

export default GameClearPage;
