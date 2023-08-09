// src/components/Audio/AudioPlayer.tsx

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";

import { toggleBgm } from "../../store/bgmSlice";

const AudioPlayer: React.FC = () => {
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn); // Redux 상태를 가져옵니다.
  const location = useLocation();
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedBgmOn = localStorage.getItem("bgmOn");
    if (savedBgmOn !== null) {
      dispatch(toggleBgm()); // 배경음악 상태를 Redux 상태에 저장합니다.
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("bgmOn", JSON.stringify(bgmOn));
  }, [bgmOn]);

  useEffect(() => {
    if (bgmOn && location.pathname !== "/") {
      const audioElement = audioElementRef.current;
      if (audioElement) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playback started successfully.");
            })
            .catch((error: any) => {
              console.error("Audio playback error:", error);
            });
        }
      }
    } else {
      const audioElement = audioElementRef.current;
      if (audioElement) {
        audioElement.pause(); // 배경음악을 정지합니다.
      }
    }
  }, [bgmOn, location]);

  const handleToggleBgm = () => {
    dispatch(toggleBgm()); // Redux 상태를 토글합니다.
  };

  return (
    <>
      <audio id="bgm-audio" ref={audioElementRef} loop>
        <source src="/music/Funny_And_Cute_Edit_4_-_Kudla.mp3" type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>

    </>
  );
};

export default AudioPlayer;
