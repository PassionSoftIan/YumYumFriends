// MainPage.js
import React, { useState } from "react";
import Cloud from "../components/Animation/Cloud";
// import useConfetti from "../hooks/Animations/useConfetti";
import useColorConfetti from "../hooks/Animations/useColorConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import RemainMeal from "../components/RemainMeal/RemainMeal";
import Alone from "../assets/Buttons/alone.png";
import Together from "../assets/Buttons/together2.png";
import Setting from "../assets/Buttons/setting.png";
import asd from "../assets/RunningYums/1.gif";
import a from "../assets/RunningYums/2.gif";
import b from "../assets/myCharAttack/1.gif";
import c from "../assets/myCharAttack/2.gif";
import d from "../assets/myCharAttack/7.gif";
import e from "../assets/10.gif";
import f from "../assets/12.gif";
import g from "../assets/myCharEnemy/1.gif";
import h from "../assets/othersAttack/2.gif";
import i from "../assets/Action/13_apple_acquired.gif";

import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const [Meal, setMeal] = useState<number | null>(null);
  const navigate = useNavigate();
  const { triggerConfetti } = useColorConfetti(5, 400);
  // const { triggerConfetti } = useConfetti(
  //   ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
  //   70,
  //   60
  // );
  const handleNavigaton = (path: string) => {
    if (Meal === 0) {
      alert("오늘 밥을 다 먹었어요!");
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
    <div className="main-container">
      <div className="RemainMeal">
        <RemainMeal Meal={Meal} setMeal={setMeal} />
      </div>

      <div>
        <div className="button-container">
          <span className="button-wrapper">
            <Button
              onClick={() => handleNavigaton("/single")}
              className="game-button"
            >
              <img src={asd} alt="" className="btnicon" />밥 먹자
            </Button>
          </span>
          <span className="button-wrapper">
            <Button
              onClick={() => handleNavigaton("/multichoice")}
              className="game-button"
            >
              <img src={asd} alt="" className="btnicon" />
              같이 먹자
            </Button>
            <div className="settings-container">
              <img
                src={Setting}
                alt=""
                className="game-button btnIcon"
                onClick={() => handleNavigaton("/settings")}
              />
            </div>
          </span>
          <span className="button-wrapper">
            <Button
              onClick={() => handleAction(() => navigate("/select"))}
              className="game-button"
            >
              <img src={asd} alt="" className="btnicon" />
              냠냠이들
            </Button>
          </span>
        </div>
      </div>
      <img src={b} alt="" className="btnIcon ani1" />
      <img src={c} alt="" className="btnIcon ani2" />
      <img src={d} alt="" className="btnIcon ani3" />
      <img src={e} alt="" className="btnIcon ani4" />
      <img src={f} alt="" className="btnIcon ani5" />
      <img src={g} alt="" className="btnIcon ani6" />
      <img src={h} alt="" className="btnIcon ani7" />
      <img src={i} alt="" className="btnIcon ani8" />
    </div>
  );
};

export default MainPage;
