import React from "react";
<<<<<<< HEAD
=======
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleBgm } from "../store/bgmSlice";
import { toggleSoundEffect } from "../store/soundEffectSlice";
>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5

import Card from "../components/Common/Card";
import Toggle from "../components/Common/Toggle";
import Stepper from "../components/Common/Stepper";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
<<<<<<< HEAD
=======
  const dispatch = useDispatch();
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);
  const soundEffectOn = useSelector((state: RootState) => state.soundEffect.soundEffectOn);

>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5
  const handleBgm = () => {
    console.log("배경음악 on/off");
  };

  const handleSoundEffect = () => {
    dispatch(toggleSoundEffect());
  };

  const tempValue = 5

  return (
    <Card>
      <ul className={styles.list}>
        <li>
          <div className={styles["toggle-container"]}>
            <Toggle label="배경음악" toggled={true} onClick={handleBgm} />
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
<<<<<<< HEAD
            <Stepper label="먹는 횟수" value={tempValue} unit="회"/>
=======
            <Stepper label="먹는 횟수" />
>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default SettingsPage;
