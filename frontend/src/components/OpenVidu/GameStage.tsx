import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../Common/Banner";
import { useNavigate } from "react-router-dom";
import { setShowEffects } from "../../store/showEffectsSlice";
import { setEating } from "../../store/eatingSlice";
import { RootState } from "../../store/store";
import GamePlay from "../SinglePage/GamePlay";
import useSoundEffect from "../../hooks/useSoundEffect";

const GameStage: React.FC = () => {
  const [nowEating, setNowEating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const eating = useSelector((state: RootState) => state.eating.value);
  const navigate = useNavigate();

  const detection = useSelector((state: RootState) => state.detection.value);
  const prevDetection = useRef(detection);

  // showEffects 상태를 가져오기 위해 useSelector 사용
  const showEffects = useSelector(
    (state: RootState) => state.showEffects.value
  );
  const dispatch = useDispatch();

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const attackSoundSource = require("../../assets/sound/yum-attack-01.wav");
  const attackSound = useSoundEffect(attackSoundSource, 1);
  const hitSoundSource = require("../../assets/sound/enemy-hit-01.wav");
  const hitSound = useSoundEffect(hitSoundSource, 1);

  const deadSoundSource = require("../../assets/sound/enemy-hit-03.mp3");
  const deadSound = useSoundEffect(deadSoundSource, 1);

  useEffect(() => {
    return () => {
      dispatch(setEating(0));
    };
  }, []);

  useEffect(() => {
    if (nowEating) {
      const timeout = setTimeout(() => {
        setNowEating(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [nowEating]);

  useEffect(() => {
    if (showAnimation) {
      const animationTimeout = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);

      return () => clearTimeout(animationTimeout);
    }
  }, [showAnimation]);

  useEffect(() => {
    if (showEffects) {
      const effectsTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
      }, 1500);

      return () => clearTimeout(effectsTimeout);
    }
  }, [showEffects, dispatch]);

  const [isCooldown, setIsCooldown] = useState(false); // 초기 값은 false로 설정

  useEffect(() => {
    if (detection && !prevDetection.current && !isCooldown) {
      if (soundEffectOn) {
        attackSound.play();

        setTimeout(() => {
          hitSound.play();
        }, 300);
      }
      setShowAnimation(true);
      dispatch(setShowEffects(!showEffects));

      if (nowEating) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 5000);
        return;
      }

      if (eating === maxEating - 1) {
        setTimeout(() => {
          deadSound.play();
        }, 2500);
        setTimeout(() => {
          console.log("Session terminated with success!");
          // const jsConfetti = new JSConfetti();
          // jsConfetti.addConfetti({
          //   emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
          //   emojiSize: 80,
          //   confettiNumber: 50,
          // });
          navigate("/gameclear");
        }, 4000); // 4초 뒤에 작동하도록 설정
      }
      //-------------------먹는시간설정---------------------
      dispatch(setEating(eating + 1));
      setNowEating(true);
      setShowAnimation(true);
      dispatch(setShowEffects(!showEffects));

      setIsCooldown(true); // 실행 후 차단 상태로 변경

      setTimeout(() => {
        setIsCooldown(false); // 3초 후 차단 해제
      }, 5000); // 10초 뒤에 차단 해제
    }
    //---------------------------------------------------
    prevDetection.current = detection;
  }, [detection]);

  // const handleButtonClick = () => {
  //   if (nowEating) {
  //     setShowModal(true);
  //     setTimeout(() => {
  //       setShowModal(false);
  //     }, 1000);
  //     return;
  //   }

  //   if (eating === maxEating - 1) {
  //     setTimeout(() => {
  //       console.log("Session terminated with success!");
  //       const jsConfetti = new JSConfetti();
  //       jsConfetti.addConfetti({
  //         emojis: ["🍆", "🍅", "🥕", "🥑", "🥔", "🍋"],
  //         emojiSize: 80,
  //         confettiNumber: 50,
  //       });
  //       navigate("/gameclear");
  //     }, 4000); // 4초 뒤에 작동하도록 설정
  //   }

  //   dispatch(setEating(eating + 1));
  //   setNowEating(true);
  //   setShowAnimation(true);
  //   dispatch(setShowEffects(!showEffects));
  // };

  return (
    <React.Fragment>
      <div>
        {showModal && <Banner content="천천히 꼭꼭" />}

      </div>
      <GamePlay />
    </React.Fragment>
  );
};

export default GameStage;
