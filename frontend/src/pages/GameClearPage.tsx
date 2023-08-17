import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSoundEffect from "../hooks/useSoundEffect";
import GetStandingYum from "../components/SinglePage/GetStandingYum";
import YumCard from "../components/SinglePage/YumCard";
import Button from "../components/Common/Button";
import "./styles/GameClearPage.css";
import axios from "axios";

interface Yum {
  name: string;
  eng: string;
  personality: string;
  strengths: string;
  id: number;
}

const GameClearPage: React.FC = () => {
  const [randomYum, setrandomYum] = useState<Yum | null>(null);
  const URL = "https://yumyumfriends.site";
  const numbers = [1, 2, 7, 10, 12, 13];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const randomID = numbers[randomIndex];
  const userID = localStorage.getItem("id");
  const MealRemain = localStorage.getItem("RemainMeal");

  const [showCard, setShowCard] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const endingSoundSource = require("../assets/sound/yum-card-01.wav");
  const endingSound = useSoundEffect(endingSoundSource, 1);

  useEffect(() => {
    if (soundEffectOn) {
      endingSound.play();
    }

    const RandomGetYum = async () => {
      try {
        const response1 = await axios.get(`${URL}/api/v1/yum`, {
          params: { id: randomID },
        });

        await axios.post(
          `${URL}/api/v1/collection/myyum?user=${userID}&yum=${randomID}`
        );
        // await axios.put(
        //   `${URL}/api/v1/user?ID=${userID}&mealRemain=${Number(MealRemain) - 1}`
        // );

        setrandomYum(response1.data);
      } catch (err) {
        console.log(err);
      }
    };
    RandomGetYum();
    // localStorage.setItem("RemainMeal", `${Number(MealRemain) - 1}`);
    setTimeout(() => {
      setShowButton(true);
    }, 3000);
  }, []);

  const targetYum = {
    name: randomYum?.eng,
    type: randomYum?.name,
    personality: randomYum?.personality,
  };

  return (
    <div className="game-clear-page">
      {randomYum !== null && showCard && (
        <>
          <YumCard yum={targetYum} />
          {showButton && (
            <Button className="like" onClick={() => setShowCard(false)}>좋아요!</Button>
          )}
        </>
      )}
      {!showCard && <GetStandingYum yum={targetYum} />}
    </div>
  );
};

export default GameClearPage;
