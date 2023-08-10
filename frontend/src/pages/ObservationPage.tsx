// 쿼리스트링 받아오기(파싱) - Session ID, Host Info ,Game Type
// Session ID를 통해 입장
// 내 화면이 아닌 Host Info 화면 띄우기

import React, { useState, useEffect } from "react";
import O_OpenViduComponent from "../components/ObservationVidu/O_OpenViduComponent";

const ObservationPage: React.FC = () => {
  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const hostInfo = urlSearch.get("HostInfo");
  const gameType = urlSearch.get("GameType");

  // console.log(sessionID);
  // console.log(hostInfo);
  // console.log(gameType);

  return (
    <div>
      <O_OpenViduComponent sessionID={ sessionID } hostInfo={ hostInfo } gameType={gameType} />
    </div>
  );
};
export default ObservationPage;