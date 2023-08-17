import React, { useState, useEffect } from "react";
import RoomItem from "./RoomListItem/RoomItem";
import axios from 'axios';
import styles from "../styles/MultiPlayPage/RoomList.module.css"

interface Session {
  sessionID: string;
  publisher: string;
  current: number;
  password: string;
}

const RoomList: React.FC = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const URL = "https://yumyumfriends.site";
  
  useEffect(() => {
    axios.get(`${URL}/api/v1/session`)
      .then((response) => {
        setSessionList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  
  return (
    <div className={styles['list-container']}>
      <p className={styles['list-title']}>친구와 냠냠</p>
      {sessionList.length === 0 ? (
      <div>입장 가능한 방이 없어요...</div>
    ) : (
      sessionList.map((session, index) => (
        session.current < 2 ? (
          <RoomItem key={index} name={session.publisher} sessionID={session.sessionID} />
        ) : null
      ))
    )}
    </div>
  );
};

export default RoomList;