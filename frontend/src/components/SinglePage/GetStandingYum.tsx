import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useSoundEffect from "../../hooks/useSoundEffect";
import useColorConfetti from "../../hooks/Animations/useColorConfetti";

interface Yum {
  name: string | undefined;
  type: string | undefined;
  personality: string | undefined;
}

interface Props {
  yum: Yum;
}

const GetStandingYum: React.FC<Props> = ({ yum }) => {
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const navigate = useNavigate();
  const { triggerConfetti } = useColorConfetti(5, 400);

  // const endingSoundSource = require("../../assets/sound/game-end.mp3");
  // const endingSound = useSoundEffect(endingSoundSource, 1);

  const clickSoundSource = require("../../assets/sound/announcement.mp3");
  const clickSound = useSoundEffect(clickSoundSource, 1);

  useEffect(() => {
    // if (soundEffectOn) {
    //   endingSound.play();
    // }

    triggerConfetti();
  }, []);

  const handleNavigate = () => {
    if (soundEffectOn) {
      clickSound.play();
    }

    navigate("/main");
  };

  return (
    <React.Fragment>
      <h3>안녕!</h3>
      <h3>반가워 친구야</h3>
      <img
        src={require(`../../assets/GetYums/${yum.name}_get.gif`)}
        alt="yum"
        onClick={handleNavigate}
      />
    </React.Fragment>
  );
};

export default GetStandingYum;
