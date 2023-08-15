import React, { useState, useEffect } from "react";
import styles from "../styles/Common/ProgressBar.module.css";

interface ProgressBarProps {
  completed: string;
  fillerColor?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const [completedWidth, setCompletedWidth] = useState(props.completed);

  useEffect(() => {
    const parsedCompleted = parseFloat(props.completed);
    setCompletedWidth(parsedCompleted > 100 ? '100' : parsedCompleted.toString());
  }, [props.completed]);

  const fillerStyles = {
    width: `var(--completed, ${completedWidth}%)`,
    backgroundColor: props.fillerColor || "#62199E",
  };

  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className={styles.filler} style={fillerStyles}>
        {/* <span className={styles.label}>{`${completedWidth}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;
