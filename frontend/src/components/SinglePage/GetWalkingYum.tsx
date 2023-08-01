import React from "react";

interface Yum {
    name: string;
    type: string;
  }
  
  interface Props {
    yum: Yum;
  }

  const GetWalkingYum: React.FC<Props> = ({ yum }) => {
  return (
    <React.Fragment>
      <p>새 친구를 찾았어요!</p>
      <div>
        <img
          src={require(`../../assets/WalkingYums/${yum.name}.gif`)}
          alt="yum image"
        />
      </div>
      <p>{yum.type}에게 인사해요👋</p>
    </React.Fragment>
  );
};

export default GetWalkingYum;
