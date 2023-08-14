import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";

const MultiCreateRoomPage: React.FC = () => {
  const UserID = localStorage.getItem("id");
  const storedNickname = localStorage.getItem("nickname");
  const UserName = storedNickname ? storedNickname.replace(/['"]+/g, "") : "null";
  const GameType = "Multi";
  const URL = "https://yumyumfriends.site";
  
  const navigate = useNavigate();
  
  const [password, setPassword] = useState(""); // 비밀번호 입력값을 상태로 관리
  
  const handlePlayAction = () => {
    navigate(`/multiplay?SessionID=${UserID}&HostInfo=${UserName}&GameType=${GameType}`);
  };

  const handleCreateAction = () => {
    const sendPasswordToServer = () => {
      axios.post(`${URL}/api/v1/session?session_id=${UserID}&password=${password}`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          axios.put(`${URL}/api/v1/session/enter?session_id=${UserID}&password=${password}`)
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              handlePlayAction();
            }
          })
          .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
    };

    sendPasswordToServer();
  };
  
  return (
    <div>
      <div>
        <span>비밀번호</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleCreateAction}>
        <span>비밀번호로 방 만들기</span>
        <hr />
      </Button>
    </div>
  );
};

export default MultiCreateRoomPage;
