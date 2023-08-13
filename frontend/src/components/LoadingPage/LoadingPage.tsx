import React from "react";
import "../styles/LoadingPage.css"; // 로딩 페이지의 스타일 파일

const LoadingPage = ({ onClick }: { onClick: () => void }) => {
  const handlePageClick = () => {
    onClick(); // 클릭 이벤트를 부모 컴포넌트로 전달
  };

  return (
    <div className="loading-container" onClick={handlePageClick}>
      <div className="loading-animation">
        <div className="text">READY!!!!</div>
        <div className="text">시작하려면 화면을 눌러줘!!!</div>
      </div>
    </div>
  );
};

export default LoadingPage;
