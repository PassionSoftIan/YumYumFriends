// 쿼리스트링 받아오기(파싱) - Session ID, Host Info ,Game Type
// Session ID를 통해 입장
// 내 화면이 아닌 Host Info 화면 띄우기

import React from "react";
import O_OpenViduComponent from "../components/ObservationVidu/O_OpenViduComponent";

const ObservationPage: React.FC = () => {
  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const encodedHostInfo = urlSearch.get("HostInfo");
  const hostInfo = decodeURIComponent(encodedHostInfo || "");
  const yumyum = urlSearch.get("yumyum");

  const commonProps = { sessionID, hostInfo, yumyum };

  // console.log(sessionID);
  // console.log(hostInfo);
  // console.log(gameType);

  return (
    <div>
      <O_OpenViduComponent {...commonProps} />
    </div>
  );
};
export default ObservationPage;