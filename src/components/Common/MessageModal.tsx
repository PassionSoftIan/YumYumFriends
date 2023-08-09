import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "../styles/Common/MessageModal.module.css";

const Backdrop: React.FC = () => {
  return <div className={classes.backdrop}/>;
};

interface ModalOverlayProps {
  message: string;
  buttonMessage: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>{props.buttonMessage}</Button>
      </footer>
    </Card>
  );
};


interface MessageModalProps {
  message: string;
  buttonMessage: string;
  onConfirm: () => void;
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          message={props.message}
          buttonMessage={props.buttonMessage}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default MessageModal;
