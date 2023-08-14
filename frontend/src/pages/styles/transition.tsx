import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionProps {
    children: ReactNode;
}


export const ZoomIn: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};


export const SlideInFromRight: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      {props.children}
    </motion.div>
  );
};


export const SlideInFromLeft: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 2 }}
    >
      {props.children}
    </motion.div>
  );
};


export const FadeIn: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};


export const FadeOut: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};


export const FadeInOut: React.FC<TransitionProps> = (props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};


export const Bounce: React.FC<TransitionProps> = (props) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, bounce: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
};

