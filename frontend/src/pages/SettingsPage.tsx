import React from "react";

import Card from "../components/Common/Card";
import Toggle from "../components/Common/Toggle";
import Stepper from "../components/Common/Stepper";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  const handleBgm = () => {
    console.log("배경음악 on/off");
  };

  const handleSoundEffect = () => {
    console.log("효과음 on/off");
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
              toggled={false}
              onClick={handleSoundEffect}
            />
          </div>
        </li>
        <li>
          <div>
            <Stepper label="먹는 횟수" value={tempValue} unit="회"/>
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default SettingsPage;
