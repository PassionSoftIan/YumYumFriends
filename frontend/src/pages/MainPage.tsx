// MainPage.js
import React, { useState } from "react";
import Cloud from "../components/Animation/Cloud";
import useColorConfetti from "../hooks/Animations/useColorConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import MessageModal from "../components/Common/MessageModal";
import Action0 from "../assets/Action/02_mandarin_acquired.gif";
import Action1 from "../assets/Action/13_apple_acquired.gif";
import Action2 from "../assets/AttackingYums/01_tofu_attack.gif";
import Action3 from "../assets/Attacked/31_bacteria_attacked.gif";
import RemainMeal from "../components/RemainMeal/RemainMeal";
import Alone from "../assets/Buttons/alone.png";
import Together from "../assets/Buttons/together2.png";
import Setting from "../assets/Buttons/setting.png";

import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const [Meal, setMeal] = useState<number | null>(null);
  const navigate = useNavigate();
  const { triggerConfetti } = useColorConfetti(5, 400);
  const [showModal, setShowModal] = useState(false);

  const handleNavigaton = (path: string) => {
    if (Meal === 0) {
      // alert("오늘 밥을 다 먹었어요!");
      setShowModal(true);
    } else {
      handleAction(() => navigate(path));
    }
  };

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
      buttons.forEach((button) => {
        button.classList.remove("hide");
      });
    }, buttons.length * 150 + 500);
  };

  return (
    <div
      className="main-container"
      style={{ backgroundImage: "url('your-background-image.jpg')" }}
    >
      {showModal && (
        <MessageModal
          message={`오늘 밥을 다 먹었어요. 내일 또 만나요!`}
          buttonMessage="확인"
          onConfirm={() => setShowModal(false)}
        />
      )}
      <Cloud />
      <div className="RemainMeal">
        <RemainMeal Meal={Meal} setMeal={setMeal} />
      </div>

      <div className="center">
        <div className="button-container">
          <Button
            onClick={() => handleNavigaton("/single")}
            className="game-button"
          >
            <span
              style={{
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={Alone}
                alt=""
                className="btnIcon"
                style={{ marginRight: "10px" }}
              />
              밥
              <br /> 먹기
            </span>
          </Button>

          <Button
            onClick={() => handleNavigaton("/multichoice")}
            className="game-button"
          >
            <span
              style={{
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={Together}
                alt=""
                className="btnIcon"
                style={{ marginRight: "10px" }}
              />
              같이
              <br /> 먹기
            </span>
          </Button>

          <div className="sub-buttons">
            <Button
              onClick={() => handleAction(() => navigate("/select"))}
              className="game-button button-second"
            >
              대표냠
            </Button>
            <Button
              onClick={() => handleNavigaton("/settings")}
              className="game-button"
            >
              <span
                style={{
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={Setting}
                  alt=""
                  className="btnIcon"
                  style={{ marginRight: "10px" }}
                />
                설정
              </span>
            </Button>
          </div>
        </div>
      </div>
      <img src={Action0} alt="" className="action-image action-image-game" />
      <img src={Action1} alt="" className="action-image1 action-image-game" />
      <img src={Action2} alt="" className="action-image2" />
      <img src={Action3} alt="" className="action-image3" />
    </div>
  );
};

export default MainPage;
