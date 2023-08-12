import React, { useState } from "react";
import RoomItem from "./RoomItem";
import axios from "axios";

interface Session {
  sessionID: string;
  publisher: string;
}

const RoomList: React.FC = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const URL = "https://yumyumfriends.site";
  axios.get(`${URL}/api/v1/session`)
  .then((data) => {
    console.log(data);
    setSessionList(data.data);
  })
  .catch((err) => console.log(err));

  return (
    <div>
      <h3>RoomList</h3>
      {sessionList.map((session, index) => (
        <RoomItem key={index} name={session.publisher} />
      ))}
    </div>
  );
};

export default RoomList;
