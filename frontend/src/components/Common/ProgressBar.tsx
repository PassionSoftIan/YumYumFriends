import React from "react";
import styles from '../styles/Common/ProgressBar.module.css';

interface ProgressBarProps {
    completed: number,
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const fillerWidth = {
        width: `var(--completed, ${props.completed}%)`,
      };

  return (
    <div className={styles.container}>
      <div className={styles.filler} style={fillerWidth}>
        {/* <span className={styles.label}>{`${props.completed}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;
