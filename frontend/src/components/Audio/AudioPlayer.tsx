// src/components/Audio/AudioPlayer.tsx

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";

import { toggleBgm } from "../../store/bgmSlice";

const AudioPlayer: React.FC = () => {
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);
  const location = useLocation();
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedBgmOn = localStorage.getItem("bgmOn");
    if (savedBgmOn !== null) {
      dispatch(toggleBgm());
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("bgmOn", JSON.stringify(bgmOn));
  }, [bgmOn]);

  useEffect(() => {
    if (bgmOn && location.pathname !== "/") {
      const audioElement = audioElementRef.current;
      if (audioElement) {
        audioElement.volume = 0.2; // 볼륨을 0.5로 설정합니다. 필요한 볼륨 값으로 변경 가능합니다.
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
        audioElement.pause();
      }
    }
  }, [bgmOn, location]);

  const handleToggleBgm = () => {
    dispatch(toggleBgm());
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
