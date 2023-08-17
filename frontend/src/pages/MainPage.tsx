// MainPage.js
import React, { useState } from "react";
import useColorConfetti from "../hooks/Animations/useColorConfetti";
import { useNavigate } from "react-router-dom";
// import Button from "../components/Common/Button";
import MainButton from "../components/MainPage/MainButton";
import MessageModal from "../components/Common/MessageModal";

import RemainMeal from "../components/RemainMeal/RemainMeal";

import Setting from "../assets/Buttons/setting.png";
import asd from "../assets/RunningYums/1.gif";
import b from "../assets/float/07_egg_swim.gif";
import c from "../assets/float/01_tofu_surf.gif";
import flyBanana from "../assets/float/banana_fly.gif";
import e from "../assets/10.gif";

import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const [Meal, setMeal] = useState<number | null>(null);
  const navigate = useNavigate();
  const { triggerConfetti } = useColorConfetti(5, 400);
  const [showModal, setShowModal] = useState(false);

  const handleNavigaton = (path: string) => {
    if (Meal === 0) {
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
      <div className="RemainMeal">
        <RemainMeal Meal={Meal} setMeal={setMeal} />
      </div>

      <div>
        <div className="button-container">
          <span className="button-wrapper">
            <MainButton
              onClick={() => handleNavigaton("/multichoice")}
              className="game-button"
            >
              <img src={asd} alt="" className="btnicon" />
              같이
            </MainButton>
          </span>
          <span className="button-wrapper">
            <MainButton
              onClick={() => handleNavigaton("/single")}
              className="game-button"
            >
              <img src={e} alt="" className="btnicon" />혼자
            </MainButton>
            {/* <div className="settings-container">
              <img
                src={Setting}
                alt=""
                className="game-button btnIcon"
                onClick={() => handleNavigaton("/settings")}
              />
            </div> */}
          </span>
          <span className="button-wrapper">
            <MainButton
              onClick={() => handleAction(() => navigate("/select"))}
              className="game-button"
            >
              <img src={asd} alt="" className="btnicon" />
              냠냠
            </MainButton>
          </span>
        </div>
      </div>
      <img src={b} alt="" className="btnIcon ani1" />
      <img src={c} alt="" className="btnIcon ani2" />
      <img src={flyBanana} alt="" className="btnIcon ani3" />
      {/* <img src={d} alt="" className="btnIcon ani3" />
      <img src={e} alt="" className="btnIcon ani4" />
      <img src={f} alt="" className="btnIcon ani5" />
      <img src={g} alt="" className="btnIcon ani6" />
      <img src={h} alt="" className="btnIcon ani7" />
      <img src={i} alt="" className="btnIcon ani8" /> */}
    </div>
  );
};

export default MainPage;
