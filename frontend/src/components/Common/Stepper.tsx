import React, { useState } from "react";
import styles from "../styles/Common/Stepper.module.css";
import Button from "./Button";

interface StepperProps {
  label: string;
  value: number;
  unit: string | undefined;
}

const Stepper: React.FC<StepperProps> = (props) => {
  const [value, setValue] = useState(props.value);

  const handleDecrease = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleIncrease = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <div>
      <strong className={styles.label}>{props.label}</strong>
      <Button onClick={handleDecrease} className={value === 1 ? styles.disabled : ""}>
        -
      </Button>
      <span>{value}</span>
      {props.unit && <span>{props.unit}</span>}
      <Button onClick={handleIncrease}>+</Button>
    </div>
  );
};

export default Stepper;
