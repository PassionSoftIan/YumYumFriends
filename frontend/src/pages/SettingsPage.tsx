import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleBgm } from "../store/bgmSlice";
import { toggleSoundEffect } from "../store/soundEffectSlice";

import Card from "../components/Common/Card";
import Toggle from "../components/Common/Toggle";
import Stepper from "../components/Common/Stepper";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);
  const soundEffectOn = useSelector((state: RootState) => state.soundEffect.soundEffectOn);

  const handleBgm = () => {
    dispatch(toggleBgm());
  };

  const handleSoundEffect = () => {
    dispatch(toggleSoundEffect());
  };

  return (
    <Card>
      <ul className={styles.list}>
        <li>
          <div className={styles["toggle-container"]}>
            <Toggle label="배경음악" toggled={bgmOn} onClick={handleBgm} />
          </div>
        </li>
        <li>
          <div className={styles["toggle-container"]}>
            <Toggle
              label="효과음"
              toggled={soundEffectOn}
              onClick={handleSoundEffect}
            />
          </div>
        </li>
        <li>
          <div>
            <Stepper label="먹는 횟수" />
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default SettingsPage;
