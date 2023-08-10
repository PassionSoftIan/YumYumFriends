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

  useEffect(() => {
    if (detection && !prevDetection.current) {
      if (nowEating) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
        return;
      }

      if (eating === maxEating - 1) {
        console.log("Session terminated with success!");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
          emojiSize: 80,
          confettiNumber: 50,
        });
        navigate("/gameclear");
      }

      setEating((prevEating) => prevEating + 1);
      setNowEating(true);
      setShowAnimation(true);
      dispatch(setShowEffects(!showEffects));
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
      console.log("Session terminated with success!");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
        emojiSize: 80,
        confettiNumber: 50,
      });
      navigate("/gameclear");
    }

    setEating(eating + 1);
    setNowEating(true);
  };

  return (
    <div>
    <React.Fragment>
      {showModal && <Banner content="천천히 꼭꼭 씹어먹자" />}
      <Button onClick={handleButtonClick}>
        Click to Eat {eating}/{maxEating}
      </Button>
    </React.Fragment>
    </div>
  );
};

export default GameStage;
