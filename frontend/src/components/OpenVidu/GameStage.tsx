import React, { useState, useEffect } from "react";
import Button from "../Common/Button";
import Banner from "../Common/Banner";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router-dom";

const GameStage: React.FC = () => {
  const [eating, setEating] = useState(0);
  const [nowEating, setNowEating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // 상태 변수 추가
  const maxEating: number = 3;
  const navigate = useNavigate();

  useEffect(() => {
    // 숟갈 유예기간
    if (nowEating) {
      const timeout = setTimeout(() => {
        setNowEating(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [nowEating]);

  useEffect(() => {
    // showAnimation 상태 값이 변경될 때 애니메이션 시간(여기서는 2초) 후에 애니메이션 상태를 다시 false로 설정
    if (showAnimation) {
      const animationTimeout = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);

      return () => clearTimeout(animationTimeout);
    }
  }, [showAnimation]);

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
    setShowAnimation(true); // 버튼이 클릭되면 애니메이션 시작 상태를 true로 설정
  };

  return (
    <div>
      <React.Fragment>
        {showModal && <Banner content="천천히 꼭꼭" />}
        <Button onClick={handleButtonClick} className={showAnimation ? "animated-button" : ""}>
          Click to Eat {eating}/{maxEating}
        </Button>
      </React.Fragment>
    </div>
  );
};

export default GameStage;
