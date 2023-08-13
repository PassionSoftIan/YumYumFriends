import React from "react";
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
  const handleAction = (action: () => void) => {
    axios.put(`${URL}/api/v1/session/enter?session_id=${props.sessionID}&password=pass`)
      .then((response) => {
        console.log(response.data);
        // 입장 가능한 경우(true를 받은 경우)
        if(response.data){
          action();
        }
      })
      .catch((error) => console.log(error));
  };

  const SessionID = props.sessionID
  const HostInfo = props.name
  const GameType = 'Multi'
  
  return (
    <div>
        <button 
          onClick={() => handleAction(() => navigate(`/multiplay?SessionID=${ SessionID }&HostInfo=${ HostInfo }&GameType=${ GameType }`))}        
          className={styles.item}
        >
          {props.name}
        </button>
    </div>
  );
};

export default RoomItem;
