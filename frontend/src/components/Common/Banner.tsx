import React from "react";
import ReactDOM from "react-dom";
import classes from "../styles/Common/Banner.module.css";

interface BannerProps {
  content: string;
}

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={classes.banner}>
          <div className={classes.content}>{props.content}</div>
        </div>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default Banner;
