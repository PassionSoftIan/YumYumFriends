import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import "./timer.css"; // Timer에 관련된 스타일을 정의한 CSS 파일을 불러옴

interface TimerProps {
  initialTime: number; // 초기 타이머 값
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const eating = useSelector((state: RootState) => state.eating.value);

  // Logic for handling timer reset when eating changes
  useEffect(() => {
    if (eating !== 0) {
      setTimer(initialTime);
    }
  }, [eating, initialTime]);

  // Main timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const updateTimer = () => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval as NodeJS.Timeout);
         
          return prevTimer;
        }
      });
    };

    if (timer > 0) {
      interval = setInterval(updateTimer, 1000);
    } 
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  return <div className="timer">{timer}</div>;
};

export default Timer;
