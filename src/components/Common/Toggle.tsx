import React, { useState } from "react";
import styles from "../styles/Common/Toggle.module.css";

interface ToggleProps {
  label: string;
  toggled: boolean;
  onClick: (isToggled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const [isToggled, toggle] = useState(props.toggled);
  const callback = () => {
    const newToggled = !isToggled;
    toggle(newToggled);
    props.onClick(newToggled);
  };

  return (
    <label className={styles.labelContainer}>
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} className={styles.input} />
      <span className={`${styles.span} ${isToggled ? styles.checked : ""}`} />
      <strong className={styles.strong}>{props.label}</strong>
    </label>
  );
};

export default Toggle;
