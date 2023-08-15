import React, { useState, useEffect } from "react";
import M_OpenViduComponent from "../components/MultiVidu/M_OpenViduComponent";
// 여기부터 싱글 import
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
// 여기까지 싱글 import

const MultiPlayPage: React.FC = () => {
  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const encodedHostInfo = urlSearch.get("HostInfo");
  const hostInfo = decodeURIComponent(encodedHostInfo || "");
  const gameType = urlSearch.get("GameType");
  const myYum = localStorage.getItem("currentYum");

  const commonProps = { sessionID, hostInfo, gameType };

  // 여기부터 싱글 변수 및 함수
  const detection = useSelector((state: RootState) => state.detection.value);
  const dispatch = useDispatch();
  const [mySession, setMySession] = useState<any>(null);

  const eating = useSelector((state: RootState) => state.eating.value);
  const maxEating = useSelector((state: RootState) => state.maxEating.value);

  const handleMySession = (obj: any) => {
    console.log("Received eatValue:", obj.eatValue);
    console.log("머먹을지고르기기기기기기기");
    setMySession(obj);
    obj.on("signal:detection", (event: any) => {
      if (event.from.connectionId !== obj.connection.connectionId) {
        console.log("Received detection from other:", event.data);
        // 공격 메시지 수신 시 애니메이션 변경
        if (event.data) {
          // 공격 애니메이션 시작
        } else {
          // 공격 애니메이션 정지
        }
      }
    });
    obj.on("signal:friendYum", (event: any) => {
      console.log("test");
      if (event.from.connectionId !== obj.connection.connectionId) {
        console.log("FriendYum is :", event.data);
        // 공격 메시지 수신 시 애니메이션 변경
        if (event.data) {
          // 공격 애니메이션 시작
        } else {
          // 공격 애니메이션 정지
        }
      }
    });
  };

  const sendMessage = (msgdata: boolean, msgtype: string) => {
    if (mySession != null) {
      mySession
        .signal({
          data: msgdata.toString(), // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: msgtype, // The type of message (optional)
        })
        .then(() => {
          console.log("Message successfully sent");
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      console.log("No session");
    }
  };

  useEffect(() => {
    if (mySession) {
      sendMessage(detection, "detection");
    }
  }, [detection]);

  return (
    <div className="Multi-play-page">
      {/* 멀티모드에서 화면 보이게 */}
      <div className="My-play-page">
        <M_OpenViduComponent
          myYum={myYum}
          onObjectCreated={handleMySession}
          {...commonProps}
        />
      </div>
      {/* 멀티모드 애니메이션 */}
    </div>
  );
};

export default MultiPlayPage;
