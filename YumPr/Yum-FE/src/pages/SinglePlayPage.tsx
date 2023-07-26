import React, { useEffect, useRef } from "react";

const SinglePlayPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 웹캠 비디오 스트림 가져오기
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getVideoStream();

    // 언마운트 시 비디오 스트림 정리
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="single-play-page">
      <div className="game-container">
        {/* 웹캠 비디오 표시 */}
        <video ref={videoRef} className="webcam-video" autoPlay playsInline />
      </div>
    </div>
  );
};

export default SinglePlayPage;
