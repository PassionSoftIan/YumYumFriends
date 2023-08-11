import React, { useState, useEffect } from "react";
import styles from "../styles/Common/ProgressBar.module.css";

interface ProgressBarProps {
  completed: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const [completedWidth, setCompletedWidth] = useState(props.completed);

  useEffect(() => {
    setCompletedWidth(props.completed);
  }, [props.completed]);

  const fillerWidth = {
    width: `var(--completed, ${completedWidth}%)`,
  };

  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className={styles.filler} style={fillerWidth}>
        <span className={styles.label}>{`${completedWidth}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
