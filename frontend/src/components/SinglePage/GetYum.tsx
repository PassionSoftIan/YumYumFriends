import React, { useState, useEffect } from "react";
import GetStandingYum from "./GetStandingYum";
import GetWalkingYum from "./GetWalkingYum";

interface Yum {
  name: string;
  type: string;
}

interface Props {
  yum: Yum;
}

const GetYum: React.FC<Props> = ({ yum }) => {
  const [showStanding, setShowStanding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStanding(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <React.Fragment>
      {showStanding ? (
        <GetStandingYum yum={yum} />
      ) : (
        <GetWalkingYum yum={yum} />
      )}
    </React.Fragment>
  );
};

export default GetYum;
