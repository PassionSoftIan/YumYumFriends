import React, { useEffect, useRef, useState } from "react";

const MultiPlayPage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      // ...

      // 웹캠 비디오 표시
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });

      setIsConnected(true);
    };

    setupWebRTC();
  }, []);

  return (
    <div>
      <h1>다중 플레이어 페이지</h1>
      <div className="video-container">
        {/* 로컬 웹캠 비디오 */}
        <video ref={localVideoRef} autoPlay muted className="local-video" />

        {/* 원격 웹캠 비디오 */}
        {isConnected && <video ref={remoteVideoRef} autoPlay className="remote-video" />}
      </div>
    </div>
  );
};

export default MultiPlayPage;
