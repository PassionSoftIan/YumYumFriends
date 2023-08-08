import React, { useState, useEffect } from "react";
import GetStandingYum from "./GetStandingYum";

interface Yum {
  name: string;
  type: string;
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
