import React, { ReactNode } from 'react';
import classes from '../styles/Common/Card.module.css';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;
