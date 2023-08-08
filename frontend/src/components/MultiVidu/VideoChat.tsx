import React, { useEffect, useRef, useState } from "react";
import { OpenVidu, Publisher, Session, Subscriber } from "openvidu-browser";

const VideoChat = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const ov = new OpenVidu();
    const mySession = ov.initSession();

    // 세션 연결을 위한 이벤트 핸들러 설정
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      const { stream } = event;
      const newSubscribers = subscribers.filter((subscriber) => subscriber.stream !== stream);
      setSubscribers(newSubscribers);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;

          const publisher = ov.initPublisher(localVideoRef.current, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            mirror: false,
          });

          mySession.connect("YOUR_OPENVIDU_SESSION_ID", "YOUR_USER_TOKEN")
            .then(() => {
              mySession.publish(publisher);
              setPublisher(publisher);
              setSession(mySession);
            })
            .catch((error) => {
              console.error("Error connecting to session:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    remoteVideoRefs.current = remoteVideoRefs.current.slice(0, subscribers.length);
  }, [subscribers]);

  const addRemoteVideoRef = (videoRef: HTMLVideoElement | null, index: number) => {
    if (videoRef) {
      remoteVideoRefs.current[index] = videoRef;
    }
  };

  const removeSubscriber = (index: number) => {
    const newSubscribers = [...subscribers];
    const subscriberToRemove = newSubscribers[index];
    if (subscriberToRemove) {
      subscriberToRemove.stream.disposeWebRtcPeer();
    }
    newSubscribers.splice(index, 1);
    setSubscribers(newSubscribers);
  };

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "200px", height: "150px" }}
      />

      {subscribers.map((subscriber, index) => (
        <div key={index}>
          <video
            ref={(videoRef) => addRemoteVideoRef(videoRef, index)}
            autoPlay
            style={{ width: "200px", height: "150px" }}
          />
          <button onClick={() => removeSubscriber(index)}>End Video Chat</button>
        </div>
      ))}
    </div>
  );
};

export default VideoChat;
