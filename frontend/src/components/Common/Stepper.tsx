import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Common/Stepper.module.css";
import { RootState } from "../../store/store";
import { setMaxEating } from "../../store/maxEatingSlice";

interface StepperProps {
  label: string;
  unit?: string;
}

const Stepper: React.FC<StepperProps> = (props) => {
  const [initialized, setInitialized] = useState(true);
  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialized) {
      dispatch(setMaxEating(maxEating));
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
    <div className={styles["stepper-container"]}>
      <strong className={styles.label}>{props.label}</strong>
      <button
        onClick={handleDecrease}
        className={maxEating === 1 ? styles.disabled : styles.button}
      >
        <span
          className={
            maxEating === 1 ? styles["span-disabled"] : styles["button-span"]
          }
        >
          -
        </span>
      </button>
      <div className={styles["value-container"]}>
        <span>{maxEating}</span>
        {props.unit && <span>{props.unit}</span>}
      </div>
      <button className={styles.button} onClick={handleIncrease}>
        <span className={styles["button-span"]}>+</span>
      </button>
    </div>
  );
};

export default Stepper;
