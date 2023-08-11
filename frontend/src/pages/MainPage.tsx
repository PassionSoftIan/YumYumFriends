import React, {useState} from "react";
import Cloud from "../components/Animation/Cloud";
import useConfetti from "../hooks/Animations/useConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Action0 from "../assets/Action/02_mandarin_acquired.gif";
import Action1 from "../assets/Action/13_apple_acquired.gif";
import Action2 from "../assets/AttackingYums/01_tofu_attack.gif";
import Action3 from "../assets/Attacked/31_bacteria_attacked.gif";
// import Action4 from "../assets/Attacked/31_bacteria_attacked.gif"
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti(
    ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
    70,
    60
  );

  const handleAction = (action: () => void) => {
    triggerConfetti();
    const buttons = document.querySelectorAll(".game-button");

    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add("hide");
      }, index * 150);
    });

    setTimeout(() => {
      action();
      buttons.forEach(button => {
        button.classList.remove("hide");
      });
    }, buttons.length * 150 + 500);
  };

  return (
    <div className="main-container">
      <Cloud />

      <div className="center">
        <div className="button-container">
          <Button
            onClick={() => handleAction(() => navigate("/single"))}
            className="game-button button-second"
          >
            <span>밥 먹기</span>
          </Button>

          <Button
            onClick={() => handleAction(() => navigate("/multi"))}
            className="game-button button-second"
          >
            <span>같이 먹기</span>
          </Button>

          <div className="sub-buttons">
            <Button
              onClick={() => handleAction(() => navigate("/select"))}
              className="game-button button-second"
            >
              대표냠
            </Button>
            <Button
              onClick={() => handleAction(() => navigate("/settings"))}
              className="game-button button-second"
            >
              설정
            </Button>
          </div>
        </div>
      </div>
      <img src={Action0} alt="" className="action-image" />
      <img src={Action1} alt="" className="action-image1" />
      <img src={Action2} alt="" className="action-image2" />
      <img src={Action3} alt="" className="action-image3" />
      {/* <img src={Action4} alt="" className="action-image4" /> */}
    </div>
  );
};

export default MainPage;
