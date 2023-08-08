import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const RandomGetYum = () => {
      axios
        .get(`${URL}/api/v1/yum/all`)
        .then((data) => {
          const randomY = Math.floor(Math.random() * 11);
          setrandomYum(data.data[randomY]);
        })
        .catch((err) => console.log(err));
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
