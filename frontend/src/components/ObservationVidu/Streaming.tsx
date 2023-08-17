import React from "react";
import styles from "./Streaming.module.css";

const leaveSession = () => {
  console.log("관전 종료");
};

const Streaming: React.FC = () => {
  return (
    <div className={styles["streaming-container"]}>
      <div className={styles.header}>
        <div className={styles.info}>
          <p>냠냠라이브</p>
          <p>
            대표냠 이미지 <span>닉네임</span>
          </p>
        </div>
        <button onClick={leaveSession}>종료하기</button>
      </div>

      <div className={styles.footer}>
        <p>배경이미지</p>
        <p>밥 먹는 아보카도</p>
      </div>
    </div>
  );
};

export default Streaming;
