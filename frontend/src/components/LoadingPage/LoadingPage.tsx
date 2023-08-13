import React from "react";
import "../styles/LoadingPage.css"; // 로딩 페이지의 스타일 파일

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <div className="text">READY!!!!</div>
        <div className="text">GO!!!!</div>
      </div>
    </div>
  );
};

export default LoadingPage;
