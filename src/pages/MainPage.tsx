import React from "react";
import Cloud from "../components/Animation/Cloud";
import useConfetti from "../hooks/Animations/useConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
// import Action0 from "../assets/Attacked/32_germ_attacked.gif"
// import Action1 from "../assets/AttackingYums/10_eggplant_attack.gif"
import Action2 from "../assets/AttackingYums/01_tofu_attack.gif"
import Action3 from "../assets/Attacked/31_bacteria_attacked.gif"
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti(
    ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
    70,
    60
  );

  // 각 핸들러 함수를 생성
  const handleAction = (action: () => void, message: string) => {
    console.log(message);
    triggerConfetti();
    action();
  };

  return (
    <div className="main-container">
      <Cloud />

      <div className="center">
        <div className="button-container">
          {/* 핸들러 함수를 호출하여 버튼에 연결 */}
          <button
            onClick={() => handleAction(() => navigate("/single"), "단일 플레이어 게임 시작")}
            className="game-button button-second btn"
          >
            <span>밥 먹기</span>
          </button>

          <button
            onClick={() => handleAction(() => navigate("/multi"), "다중 플레이어 게임 시작")}
            className="game-button button-second btn"
          >
            <span>같이 먹기</span>
          </button>

          {/* <button
            onClick={() => handleAction(() => navigate("/dex"), "도감")}
            className="game-button button-second btn"
          >
            <span>냠냠이들</span>
          </button> */}
          <Button onClick={() => handleAction(() => navigate("/settings"), "설정")}>설정</Button>
          <Button onClick={() => handleAction(() => navigate("/select"), "대표냠")}>대표냠</Button>
        </div>
      </div>
      {/* <img src={Action0} alt="" className="action-image" />
      <img src={Action1} alt="" className="action-image1" /> */}
      <img src={Action2} alt="" className="action-image2" />
      <img src={Action3} alt="" className="action-image3" />
    </div>
  );
};

export default MainPage;
