import React, { ReactNode, MouseEventHandler } from 'react';
import classes from '../styles/Common/Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, onClick, children } = props;
  return (
    <button
      className={classes.button}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
