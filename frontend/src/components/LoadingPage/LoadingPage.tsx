import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useSoundEffect from "../../hooks/useSoundEffect";
import "../styles/LoadingPage.css"; // 로딩 페이지의 스타일 파일

const LoadingPage = ({ onClick }: { onClick: () => void }) => {
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const readySoundSource = require("../../assets/sound/temp.mp3");
  const readySound = useSoundEffect(readySoundSource, 0.3);

  useEffect(() => {
    if (soundEffectOn) {
      readySound.play();
    }
  }, []);

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
