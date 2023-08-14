import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProgressBar from "../Common/ProgressBar";
import styles from "../styles/SinglePage/GamePlay.module.css";

const GamePlay: React.FC = () => {
  // const eating = useSelector((state: RootState) => state.eating.value);
  const [eating, setEating] = useState(0);
  const [myEnergy, setMyEnergy] = useState(-1); // 기 모으기
  const [enemyEnergy, setEnemyEnergy] = useState(0); // 병균 기모으기
  const [enemyAttack, setEnemyAttack] = useState(false); // 병균 공격

  const requiredEnergy = 5; // 스킬 쓸 때 필요한 에너지
  const maxEnemyEnergy = 3;

  const myProgress = ((myEnergy / requiredEnergy) * 100).toFixed(0);
  const enemyProgress = ((enemyEnergy / maxEnemyEnergy) * 100).toFixed(0);

  const handleEating = () => {
    setEating(eating + 1);
  };

  useEffect(() => {
    return () => {
      setMyEnergy((prev) => prev + 1);
      setEnemyEnergy(0); //먹어서 공격 받으면 병균이 에너지 초기화
    };
  }, [eating]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemyEnergy(enemyEnergy + 1);
      if (enemyEnergy === maxEnemyEnergy - 1) {
        console.log("병균이 냠냠 공격");
        setEnemyAttack(true);

        setTimeout(() => {
          // 공격 애니메이션 동안 대기
          setEnemyEnergy(0);
          setEnemyAttack(false);
        }, 5000);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [enemyEnergy]);

  const handleEnergyAttack = () => {
    console.log("냠냠 스킬 공격");
    setMyEnergy(myEnergy - requiredEnergy);
  };

  return (
    <React.Fragment>
      <button onClick={handleEating}>먹었다치고</button>
      <div className={styles["game-play"]}>
        <div className={styles["interface-container"]}>
          <div className={styles["energy-container"]}>
            <p>⚡</p>
            <p>{myEnergy}</p>
            <ProgressBar completed={myProgress} fillerColor="green" />
          </div>
          <button
            onClick={handleEnergyAttack}
            disabled={myEnergy < requiredEnergy}
            className={styles["skill-button"]}
          >
            <img
              className={styles["skill-icon"]}
              src={require(`../../assets/Common/empowerment.png`)}
            />
          </button>
        </div>
        <div className={styles["test"]}></div>
        <div className={styles["interface-container"]}>
          <div className={styles["energy-container"]}>
            <p>⚡</p>
            <p>{enemyEnergy}</p>
            <ProgressBar completed={enemyProgress} fillerColor="black" />
          </div>
          <button
            onClick={() => {}}
            disabled={enemyEnergy < maxEnemyEnergy}
            className={styles["skill-button"]}
          >
            <img
              className={styles["skill-icon"]}
              src={require(`../../assets/Common/empowerment.png`)}
            />
          </button>
        </div>
      </div>

      <div>
        <p hidden={!enemyAttack}>병균이 공격 중</p>
      </div>


    </React.Fragment>
  );
};

export default GamePlay;
