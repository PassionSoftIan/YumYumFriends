import React from "react";

import Card from "../components/Common/Card";
import Button from "../components/Common/Button";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  return (
    <Card>
      <ul className={styles.list}>
        <li>
          <div>
            <span>배경음악 [토글버튼]</span>
          </div>
        </li>
        <li>
          <div>
            <span>효과음 [토글버튼]</span>
          </div>
        </li>
        <li>
          <div>
            <span>먹는 횟수</span>
            <Button>-</Button>
            <span>5</span>
            <Button>+</Button>
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default SettingsPage;
