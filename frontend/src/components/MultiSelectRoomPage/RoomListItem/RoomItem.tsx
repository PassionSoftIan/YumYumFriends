import React, { useState } from "react";
import styles from '../../styles/MultiPlayPage/RoomItem.module.css'
import axios from 'axios';

import { useNavigate } from "react-router-dom";

interface RoomItemProps {
  name: string;
  sessionID: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const navigate = useNavigate();
  const URL = "https://yumyumfriends.site";

  const [password, setPassword] = useState(""); // 비밀번호 입력값을 상태로 관리
  
  const handleAction = () => {
    axios.put(`${URL}/api/v1/session/enter?session_id=${props.sessionID}&password=${password}`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          // 비밀번호 검증 후 성공 시 페이지 이동
          navigate(`/multiplay?SessionID=${props.sessionID}&HostInfo=${props.name}&GameType=Multi`);
        }
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      <div>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          onClick={handleAction}        
          className={styles.item}
        >
          {props.name}
        </button>
      </div>
    </div>
  );
};

export default RoomItem;
