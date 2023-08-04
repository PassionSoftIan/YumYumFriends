import React, { ReactNode, MouseEventHandler } from 'react';
import classes from '../styles/Common/Button.module.css';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, onClick, children } = props;
  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
