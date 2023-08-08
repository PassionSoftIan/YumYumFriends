import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Common/Stepper.module.css";
import Button from "./Button";
import { RootState } from "../../store/store";
import { setMaxEating } from "../../store/maxEatingSlice";

interface StepperProps {
  label: string;
  unit: string | undefined;
}

const Stepper: React.FC<StepperProps> = (props) => {
  const [initialized, setInitialized] = useState(true); // 초기값을 true로 설정
  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialized) {
      dispatch(setMaxEating(maxEating)); // 최종값으로 설정
      setInitialized(true);
    }
  }, [dispatch, initialized, maxEating]);

  const handleDecrease = () => {
    if (maxEating > 1) {
      dispatch(setMaxEating(maxEating - 1));
    }
  };

  const handleIncrease = () => {
    dispatch(setMaxEating(maxEating + 1));
  };

  return (
    <div>
      <strong className={styles.label}>{props.label}</strong>
      <Button onClick={handleDecrease} className={maxEating === 1 ? styles.disabled : ""}>
        -
      </Button>
      <span>{maxEating}</span>
      {props.unit && <span>{props.unit}</span>}
      <Button onClick={handleIncrease}>+</Button>
    </div>
  );
};

export default Stepper;
