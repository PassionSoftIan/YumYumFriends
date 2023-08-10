<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
import Button from "../Common/Button";
import Banner from "../Common/Banner";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router-dom";
import { div } from "@tensorflow/tfjs";

const GameStage: React.FC = () => {
  const [eating, setEating] = useState(0);
  const [nowEating, setNowEating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const maxEating: number = 3;
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const detection = useSelector((state: RootState) => state.detection.value);
  const prevDetection = useRef(detection);

  // showEffects 상태를 가져오기 위해 useSelector 사용
  const showEffects = useSelector(
    (state: RootState) => state.showEffects.value
  );
  const dispatch = useDispatch();

>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
  useEffect(() => {
    // 숟갈 유예기간
    if (nowEating) {
      const timeout = setTimeout(() => {
        setNowEating(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [nowEating]);

<<<<<<< HEAD
=======
  useEffect(() => {
    if (showAnimation) {
      const animationTimeout = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);

      return () => clearTimeout(animationTimeout);
    }
  }, [showAnimation]);

  useEffect(() => {
    if (showEffects) {
      const effectsTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
      }, 1500);

      return () => clearTimeout(effectsTimeout);
    }
  }, [showEffects, dispatch]);

  const [isCooldown, setIsCooldown] = useState(false); // 초기 값은 false로 설정

  useEffect(() => {
    if (detection && !prevDetection.current && !isCooldown) {
      setShowAnimation(true);
      dispatch(setShowEffects(!showEffects));
  
      if (nowEating) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 5000);
        return;
      }
  
      if (eating === maxEating - 1) {
        setTimeout(() => {
          console.log("Session terminated with success!");
          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti({
            emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
            emojiSize: 80,
            confettiNumber: 50,
          });
          navigate("/gameclear");
        }, 4000); // 4초 뒤에 작동하도록 설정
      }
  
      setEating((prevEating) => prevEating + 1);
      setNowEating(true);
      setShowAnimation(true);
      dispatch(setShowEffects(!showEffects));
  
      setIsCooldown(true); // 실행 후 차단 상태로 변경
  
      setTimeout(() => {
        setIsCooldown(false); // 3초 후 차단 해제
      }, 10000); // 10초 뒤에 차단 해제
    }
  
    prevDetection.current = detection;
  }, [detection]);

>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
  const handleButtonClick = () => {
    if (nowEating) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
      return;
    }

    if (eating === maxEating - 1) {
      setTimeout(() => {
        console.log("Session terminated with success!");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
          emojiSize: 80,
          confettiNumber: 50,
        });
        navigate("/gameclear");
      }, 4000); // 4초 뒤에 작동하도록 설정
    }

    setEating(eating + 1);
    setNowEating(true);
  };

  return (
<<<<<<< HEAD
    <div>
    <React.Fragment>
      {showModal && <Banner content="천천히 꼭꼭 씹어먹자" />}
      <Button onClick={handleButtonClick}>
        Click to Eat {eating}/{maxEating}
      </Button>
    </React.Fragment>
    </div>
=======
    <React.Fragment>
      <div>
        {showModal && <Banner content="천천히 꼭꼭" />}
        <Button
          onClick={handleButtonClick}
          className={showAnimation ? "animated-button" : ""}
        >
          Click to Eat {eating}/{maxEating}
        </Button>
        {showEffects && <div>이펙트가 보여집니다!</div>}
      </div>
    </React.Fragment>
>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5
  );
};

export default GameStage;
