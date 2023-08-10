import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Cloud from "../components/Animation/Cloud";
import useConfetti from "../hooks/Animations/useConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Action0 from "../assets/Action/02_mandarin_acquired.gif";
import Action1 from "../assets/Action/13_apple_acquired.gif";
import Action2 from "../assets/AttackingYums/01_tofu_attack.gif";
import Action3 from "../assets/Attacked/31_bacteria_attacked.gif";
// import Action4 from "../assets/Attacked/31_bacteria_attacked.gif"
import useSoundEffect from "../hooks/useEffectSound";
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const hoverSoundSource = require("../assets/sound/interface.mp3");
  const clickSoundSource = require("../assets/sound/announcement.mp3");
  const hoverSound = useSoundEffect(hoverSoundSource, 0.3);
  const clickSound = useSoundEffect(clickSoundSource, 0.5);

  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti(
    ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
    70,
    60
  );

  // 각 핸들러 함수를 생성
  const handleAction = (action: () => void, message: string) => {
    console.log(message);
    if (soundEffectOn) {
      clickSound.play();
    }
    triggerConfetti();
<<<<<<< HEAD
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
=======
    action();
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
  };

  const handleHover = () => {
    if (soundEffectOn) {
      hoverSound.play();
    }
  };

  return (
    <div className="main-container">
<<<<<<< HEAD
        <Cloud />
        <div className="center">
          <div className="button-container">
            <button
              onClick={handleSinglePlayerGame}
              className="game-button button-second btn"
            >
              <span>Single</span>
            </button>
=======
      <Cloud />

      <div className="center">
        <div className="button-container">
          {/* 핸들러 함수를 호출하여 버튼에 연결 */}
          <button
            onClick={() =>
              handleAction(() => navigate("/single"), "단일 플레이어 게임 시작")
            }
            onMouseOver={handleHover}
            className="game-button button-second btn"
          >
            <span>밥 먹기</span>
          </button>
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e

          <button
            onClick={() =>
              handleAction(() => navigate("/multi"), "다중 플레이어 게임 시작")
            }
            className="game-button button-second btn"
          >
            <span>Multi</span>
          </button>

          {/* <button
            onClick={() => handleAction(() => navigate("/dex"), "도감")}
            className="game-button button-second btn"
          >
<<<<<<< HEAD
            <span>프로필</span>
          </button>
          <Button onClick={handleSettings}>설정</Button>
          <Button onClick={handleSelect}>대표냠</Button>
        </div>
      </div>
      </div>
=======
            <span>냠냠이들</span>
          </button> */}
          <div className="sub-buttons">
            {/* 대표냠 버튼 */}
            <Button
              onClick={() => handleAction(() => navigate("/select"), "대표냠")}
              className="game-button button-second btn"
            >
              대표냠
            </Button>

            {/* 설정 버튼 */}
            <Button
              onClick={() => handleAction(() => navigate("/settings"), "설정")}
              className="game-button button-second btn"
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
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
  );
};

export default MainPage;
