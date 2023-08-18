import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSoundEffect from "../hooks/useSoundEffect";
import IntroLogo from "../components/IntroPage/IntroLogo";
import IntroCaution from "../components/IntroPage/IntroCaution";
import "./styles/IntroPage.css"; // IntroPage에 대한 스타일을 정의한 CSS 파일을 import
import { FadeIn, FadeOut } from "./styles/transition";

const IntroPage = () => {
  const [showLogo, setShowLogo] = useState(true);

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const introSoundSource = require("../assets/sound/intro.mp3");

  const introSound = useSoundEffect(introSoundSource, 0.3);

  useEffect(() => {
    if (soundEffectOn) {
      introSound.play();
    }

    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCautionButtonClick = () => {
    // IntroCaution의 확인 버튼을 눌렀을 때 처리하는 로직
    // LoginPage로 이동
    console.log("확인 버튼 클릭");
    // 이 부분을 LoginPage로 이동하는 라우팅 로직으로 변경해야 합니다.
  };

  return (
    <div className="IntroBack">
      {showLogo ? (
          <IntroLogo />

      ) : (
        <FadeIn>
          <IntroCaution onButtonClick={handleCautionButtonClick} />
        </FadeIn>
      )}
    </div>
  );
};

export default IntroPage;
