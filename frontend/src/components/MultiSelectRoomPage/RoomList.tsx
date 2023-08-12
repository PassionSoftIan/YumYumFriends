import React, { useState, useEffect } from "react";
import RoomItem from "./RoomListItem/RoomItem";
import axios from 'axios';

interface Session {
  sessionID: string;
  publisher: string;
}

const RoomList: React.FC = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const URL = "https://yumyumfriends.site";
  
  useEffect(() => {
    console.log("test text")
    axios.get(`${URL}/api/v1/session`)
      .then((response) => {
        console.log(response);
        setSessionList(response.data);
      })
      .catch((error) => console.log(error));
  }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함
  
  
  return (
    <div>
      <h3>RoomList</h3>
      {sessionList.map((session, index) => (
        <RoomItem key={index} name={session.publisher} sessionID={session.sessionID} />
      ))}
    </div>
  );
};

export default RoomList;