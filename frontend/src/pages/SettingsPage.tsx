import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleBgm } from "../store/bgmSlice";
import { toggleSoundEffect } from "../store/soundEffectSlice";
import useSoundEffect from "../hooks/useSoundEffect";

import Toggle from "../components/Common/Toggle";
import Stepper from "../components/Common/Stepper";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const clickSoundSource = require("../assets/sound/stepper.ogg");
  const clickSound = useSoundEffect(clickSoundSource, 0.5);

  const handleBgm = () => {
    dispatch(toggleBgm());
  };

  const handleSoundEffect = () => {
    if (!soundEffectOn) {
      clickSound.play();
    }
    dispatch(toggleSoundEffect());
  };

  return (
    <div className={styles["settings-container"]}>
      <div className={styles["settings-banner"]}>
        <p>설정</p>
      </div>
      <div className={styles["settings-items"]}>
        <Stepper label="먹는 횟수" />

        <div className={styles["toggle-container"]}>
          <Toggle label="배경음악" toggled={bgmOn} onClick={handleBgm} />

          <Toggle
            label="효과음"
            toggled={soundEffectOn}
            onClick={handleSoundEffect}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
