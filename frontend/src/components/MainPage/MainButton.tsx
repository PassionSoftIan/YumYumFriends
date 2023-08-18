import React, { ReactNode, MouseEventHandler } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';

import classes from './MainButton.module.css';
import useSoundEffect from "../../hooks/useSoundEffect";



interface MainButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const MainButton: React.FC<MainButtonProps> = (props) => {
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const hoverSoundSource = require("../../assets/sound/interface.mp3");
  const clickSoundSource = require("../../assets/sound/announcement.mp3");
  const hoverSound = useSoundEffect(hoverSoundSource, 0.1);
  const clickSound = useSoundEffect(clickSoundSource, 0.3);

  const handleHover = () => {
    if (soundEffectOn) {
      hoverSound.play();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (soundEffectOn) {
      clickSound.play();
    }
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const { type, children } = props;
  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={type || 'button'}
      onClick={handleClick}
      onMouseOver={handleHover}
    >
      {children}
    </button>
  );
};

export default MainButton;
