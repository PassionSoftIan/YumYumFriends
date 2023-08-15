import React from "react";
import GetStandingYum from "./GetStandingYum";

interface Yum {
  name: string | undefined;
  type: string | undefined;
  personality: string | undefined;
}

interface Props {
  yum: Yum;
}

const GetYum: React.FC<Props> = ({ yum }) => {
  return (
    <React.Fragment>
      <GetStandingYum yum={yum} />
    </React.Fragment>
  );
};

export default GetYum;
