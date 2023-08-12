import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setEating } from "../../store/eatingSlice";

const GamePlay: React.FC = () => {
  const eating = useSelector((state: RootState) => state.eating.value);
  const [prevEating, setPrevEating] = useState(eating);
  const [currentEating, setCurrentEating] = useState(0); // 기 모으기
  const [enemyPower, setEnemyPower] = useState(0); // 병균 기모으기
  const [enemyAttack, setEnemyAttack] = useState(false); // 병균 공격
  const maxEnemyPower = 3;

  useEffect(() => {
    return () => {
      if (eating === prevEating + 1) {
        setCurrentEating(currentEating + 1);
      }
      setPrevEating(eating);

      //먹어서 공격 받으면 병균이 에너지 초기화
      setEnemyPower(0);
    };
  }, [eating, prevEating]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemyPower(enemyPower + 1);
      if (enemyPower === maxEnemyPower - 1) {
        console.log("병균이 냠냠 공격");
        setEnemyAttack(true);

        setTimeout(() => {
          // 공격 애니메이션 동안 대기
          setEnemyPower(0);
          setEnemyAttack(false);
        }, 5000);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [enemyPower]);


  const handlePowerAttack = () => {
    console.log("냠냠 스킬 공격");
    setCurrentEating(currentEating - 3);
    setEating(eating - 3);
  };

  return (
    <React.Fragment>
      <div>
        <p>⚡ {currentEating}</p>
        <button onClick={handlePowerAttack} disabled={currentEating < 3}>
          스킬 공격
        </button>
      </div>
      <div>
        <p>
          enemy power: {enemyPower} / {maxEnemyPower}
        </p>
        <p>병균 공격 아이콘</p>
        <p hidden={!enemyAttack}>병균이 공격 중</p>
      </div>
    </React.Fragment>
  );
};

export default GamePlay;
