import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";

import { toggleBgm } from "../../store/bgmSlice";

const AudioPlayer: React.FC = () => {
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);
  const location = useLocation();
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  const [volume, setVolume] = useState(0.5); // 초기 볼륨 값을 0.5로 설정

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
    const audioElement = audioElementRef.current;

    if (audioElement) {
      audioElement.volume = volume; // 볼륨 설정

      if (bgmOn && location.pathname !== "/") {
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
      } else {
        audioElement.pause();
      }
    }
  }, [bgmOn, location, volume]);

  const handleToggleBgm = () => {
    dispatch(toggleBgm());
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <audio id="bgm-audio" ref={audioElementRef} loop>
        <source src="/music/Funny_And_Cute_Edit_4_-_Kudla.mp3" type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>
      {/* 볼륨 라벨 */}
      <div>
        <label htmlFor="volume">Volume:</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      
    </>
  );
};

export default AudioPlayer;
