import React from "react";
import Button from "../components/Common/Button";

import { useNavigate } from "react-router-dom";

const MultiChoicePage: React.FC = () => {
  // const [showButtons, setShowButtons] = useState(true);
  // const [showCreateRoom, setShowCreateRoom] = useState(false);
  // const [showSelectRoom, setShowSelectRoom] = useState(false);

  const UserID = localStorage.getItem("id");
  const storedNickname = localStorage.getItem("nickname");
  const UserName = storedNickname ? storedNickname.replace(/['"]+/g, "") : "null";
  const GameType = "Multi";

  const navigate = useNavigate();
  const handleAction = (action: () => void) => {
    action();
  };

  // const handleCreateRoomClick = () => {
  //   setShowButtons(false);
  //   setShowCreateRoom(true);
  // };

  // const handleSelectRoomClick = () => {
  //   setShowButtons(false);
  //   setShowSelectRoom(true);
  // };

  return (
    <div className="multi-play-page">
      {/* {showButtons && (
        <div>
          <Button onClick={handleCreateRoomClick}>
            <span>Create Room</span>
          </Button>

          <Button onClick={handleSelectRoomClick}>
            <span>Select Room</span>
          </Button>



        </div>
      )}
      {showCreateRoom && <MultiPlayPage />}
      {showSelectRoom && <MultiSelectRoomPage />} */}

      <Button
        onClick={(

          // 여기서 엑시오스 요청으로 방 정보 DB로 보내기
            // Room DB 안에
            // SessionID, HostInfo 정보 넣어서 보내기


          // 이후 navigate로 router 이동
        ) => handleAction(() => navigate(`/multiplay?SessionID=${ UserID }&HostInfo=${ UserName }&GameType=${ GameType }`))}
        className="game-button button-second"
      >
        <span>Create Room</span>
      </Button>

      <Button
        onClick={() => handleAction(() => navigate("/multiroom"))}
        className="game-button button-second"
      >
        <span>Select Room</span>
      </Button>
    </div>
  );
};

export default MultiChoicePage;
