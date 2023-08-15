import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useColorConfetti from '../../hooks/Animations/useColorConfetti';
import YumCard from "./YumCard";
import Button from "../Common/Button";

interface Yum {
  name: string | undefined;
  type: string | undefined;
  personality: string | undefined;
}

interface Props {
  yum: Yum;
}

const GetStandingYum: React.FC<Props> = ({ yum }) => {
  const [showCard, setShowCard] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const { triggerConfetti } = useColorConfetti(5, 400);

  useEffect(() => {
    triggerConfetti();
  }, []);

  const handleShowCard = () => {
    setShowCard(true);

    setTimeout(() => {
      setShowButton(true);
    }, 3000);
  };

  const handleNavigate = () => {
    navigate("/main");
  };

  return (
    <React.Fragment>
      {!showCard && (
        <>
          <h3>안녕!</h3>
          <h3>반가워 친구야</h3>
          <img
            src={require(`../../assets/GetYums/${yum.name}_get.gif`)}
            alt="yum"
            onClick={handleShowCard}
          />
        </>
      )}

      {showCard && (
        <>
          <YumCard yum={yum} />
          {showButton && <Button onClick={handleNavigate}>처음으로</Button>}
        </>
      )}
    </React.Fragment>
  );
};

export default GetStandingYum;
