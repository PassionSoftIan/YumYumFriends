import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch 추가
import { RootState } from "../../store/store";
import ProgressBar from "../Common/ProgressBar";
import styles from "../styles/SinglePage/GamePlay.module.css";
import { setEnemyEnergy } from "../../store/enemyEnergySlice"; // setEnemyEnergy 추가
import {
  setShowEffects,
  selectShowEffects,
} from "../../store/showEffectsSlice";
import { setEating } from "../../store/eatingSlice";

const GamePlay: React.FC = () => {
  const showEffects = useSelector(selectShowEffects);
  const eating = useSelector((state: RootState) => state.eating.value);
  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const hitPoints = ((1 - eating / maxEating) * 100).toFixed(0);

  const enemyEnergy = useSelector(
    (state: RootState) => state.enemyEnergy.enemyEnergy
  ); // enemyEnergy 가져오기
  const maxEnemyEnergy = useSelector(
    (state: RootState) => state.enemyEnergy.maxEnemyEnergy
  ); // maxEnemyEnergy 가져오기
  const [myEnergy, setMyEnergy] = useState(0);
  const requiredEnergy = 2; //스킬 사용 시 필요한 에너지 스택

  const myProgress = ((myEnergy / requiredEnergy) * 100).toFixed(0);
  const enemyProgress = ((enemyEnergy / maxEnemyEnergy) * 100).toFixed(0);

  const dispatch = useDispatch(); // useDispatch 훅 사용

  useEffect(() => {
    const delay = 500; // 원하는 딜레이 시간 (밀리초)
    
    const timer = setTimeout(() => {
      console.log(eating);
      setMyEnergy(eating % 3);
      dispatch(setEnemyEnergy(0));
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [eating, dispatch]);
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setEnemyEnergy(enemyEnergy + 1)); // setEnemyEnergy 액션을 사용하여 enemyEnergy 값 업데이트
      if (enemyEnergy === maxEnemyEnergy - 1) {
        console.log("병균이 냠냠 공격");

        setTimeout(() => {
          dispatch(setEnemyEnergy(0)); // setEnemyEnergy 액션을 사용하여 enemyEnergy 초기화
        }, 2000);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [enemyEnergy, maxEnemyEnergy, dispatch]);

  const handleEnergyAttack = () => {
    console.log("냠냠 스킬 공격");
    setMyEnergy(myEnergy - requiredEnergy);
    // dispatch(setShowEffects(true)); // showEffects를 true로 설정
    dispatch(setEating(eating + 1));
  };

  return (
    <React.Fragment>
      <div className={styles["game-play"]}>
        <div className={styles["interface-container"]}>
          <div className={styles["energy-container"]}>
            <p>⚡</p>
            <ProgressBar completed={myProgress} fillerColor="olivedrab" />
          </div>
          <button
            onClick={handleEnergyAttack}
            disabled={myEnergy < requiredEnergy}
            className={styles["skill-button"]}
          >
            <img
              className={styles["skill-icon"]}
              src={require(`../../assets/Common/empowerment.png`)}
              alt=""
            />
          </button>
        </div>
        <div className={styles["interface-container"]}>
          <div className={styles["energy-container"]}>
            <p>⚡</p>
            <ProgressBar completed={enemyProgress} fillerColor="indigo" />
          </div>
          <button
            onClick={() => {}}
            disabled={enemyEnergy < maxEnemyEnergy}
            className={styles["skill-button"]}
          >
            <img
              className={styles["skill-icon"]}
              src={require(`../../assets/Common/empowerment.png`)}
              alt=""
            />
          </button>
          <div
            className={`${styles["energy-container"]} ${styles["enemy-hitpoints"]}`}
          >
            <p>❤️</p>
            <ProgressBar completed={hitPoints} fillerColor="crimson" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GamePlay;
