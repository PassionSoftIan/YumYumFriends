import React, { useState, useEffect } from "react";
import Button from "../Common/Button";
import Banner from "../Common/Banner";
import JSConfetti from "js-confetti";

const GameStage: React.FC = () => {
  const [eating, setEating] = useState(0);
  const [nowEating, setNowEating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const maxEating: number = 5;

  useEffect(() => {
    // 숟갈 유예기간
    if (nowEating) {
      const timeout = setTimeout(() => {
        setNowEating(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [nowEating]);

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
    }

    setEating(eating + 1);
    setNowEating(true);
  };

  return (
    <React.Fragment>
      {showModal && <Banner content="천천히 꼭꼭 씹어먹자" />}
      <Button onClick={handleButtonClick}>
        Click to Eat {eating}/{maxEating}
      </Button>
    </React.Fragment>
  );
};

export default GameStage;
