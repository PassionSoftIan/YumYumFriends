import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Common/Button";
import Banner from "../Common/Banner";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router-dom";
import { setShowEffects } from "../../store/showEffectsSlice";
import { RootState } from "../../store/store";

const GameStage: React.FC = () => {
  const [eating, setEating] = useState(0);
  const [nowEating, setNowEating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const navigate = useNavigate();

  // showEffects 상태를 가져오기 위해 useSelector 사용
  const showEffects = useSelector(
    (state: RootState) => state.showEffects.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (nowEating) {
      const timeout = setTimeout(() => {
        setNowEating(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [nowEating]);

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
      }, 2000);

      return () => clearTimeout(effectsTimeout);
    }
  }, [showEffects, dispatch]);


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
    setShowAnimation(true);
    dispatch(setShowEffects(!showEffects));
  };

  return (
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
  );
};

export default GameStage;
