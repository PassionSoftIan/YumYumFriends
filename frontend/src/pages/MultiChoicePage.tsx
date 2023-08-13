import React from "react";
import Button from "../components/Common/Button";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const MultiChoicePage: React.FC = () => {
  // const [showButtons, setShowButtons] = useState(true);
  // const [showCreateRoom, setShowCreateRoom] = useState(false);
  // const [showSelectRoom, setShowSelectRoom] = useState(false);

  const UserID = localStorage.getItem("id");
  const storedNickname = localStorage.getItem("nickname");
  const UserName = storedNickname ? storedNickname.replace(/['"]+/g, "") : "null";
  const GameType = "Multi";
  const URL = "https://yumyumfriends.site";

  const navigate = useNavigate();
  const handleCreateAction = (action: () => void) => {
    // DB에 세션 생성 요청
    axios.post(`${URL}/api/v1/session?session_id=${UserID}&password=pass`)
    .then((response)=>{
      console.log(response.data);
      // 세션 생성에 성공한 경우
      if(response.data){
        // 세션에 입장 요청
        axios.put(`${URL}/api/v1/session/enter?session_id=${UserID}&password=pass`)
        .then((response) => {
          console.log(response.data);
          // 세션 입장이 가능한 경우(true를 받은 경우)
          if(response.data){
            action();
          }
        })
        .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
  };
  const handleSelectAction = (action: () => void) => {
    action();
  };

  return (
    <div className="multi-play-page">
      <Button
        onClick={(

          // 여기서 엑시오스 요청으로 방 정보 DB로 보내기
            // Room DB 안에
            // SessionID, HostInfo 정보 넣어서 보내기


          // 이후 navigate로 router 이동
        ) => handleCreateAction(() => navigate(`/multiplay?SessionID=${ UserID }&HostInfo=${ UserName }&GameType=${ GameType }`))}
        className="game-button button-second"
      >
        <span>Create Room</span>
      </Button>

      <Button
        onClick={() => handleSelectAction(() => navigate("/multiroom"))}
        className="game-button button-second"
      >
        <span>Select Room</span>
      </Button>
    </div>
  );
};

export default MultiChoicePage;
