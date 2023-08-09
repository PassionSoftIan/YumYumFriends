import React, { useEffect, useState, useRef } from "react";
import GetYum from "../components/SinglePage/GetYum";
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
  // 여기서 랜덤으로 수집할 냠냠이를 정해줘야함
  // API요청 보내서 설정하자
  const [randomYum, setrandomYum] = useState<Yum | null>(null);
  const URL = "https://yumyumfriends.site";
  const numbers = [1, 2, 7, 10, 12, 13];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const randomID = numbers[randomIndex];
  const userID = localStorage.getItem("id");

  useEffect(() => {
    const RandomGetYum = async () => {
      try {
        const response1 = await axios.get(`${URL}/api/v1/yum`, {
          params: { id: randomID },
        });

        await axios.post(
          `${URL}/api/v1/collection/myyum?user=${userID}&yum=${randomID}`
        );

        setrandomYum(response1.data);
      } catch (err) {
        console.log(err);
      }
    };

    RandomGetYum();
  }, []);

  const targetYum = {
    name: randomYum?.eng,
    type: randomYum?.name,
  };

  return (
    <div className="game-clear-page">
      {randomYum && <GetYum yum={targetYum} />}
    </div>
  );
};

export default GameClearPage;
