import React, {useState} from "react";
import GetYum from "../components/SinglePage/GetYum";
import SelectYum from "../components/SinglePage/SelectYum";
import "./styles/GameClearPage.css";

const GameClearPage: React.FC = () => {
  // 여기서 랜덤으로 수집할 냠냠이를 정해줘야함
  // API요청 보내서 설정하자
  const targetYum = {
    name: "eggplant",
    type: "가지맨",
  };

  const [isClear, setIsClear] = useState(false);

  return (
    <div className="game-clear-page">
      {isClear ? <GetYum yum={targetYum} /> : <SelectYum />}
    </div>
  );
};

export default GameClearPage;
