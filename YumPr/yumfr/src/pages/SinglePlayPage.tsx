import React, { useEffect, useRef } from "react";

const WebcamCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = { video: true };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
    } else {
      console.error("Webcam not supported");
    }
  }, []);

  return (
    <div>
      <h1>Single play mode</h1>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default WebcamCapture;
