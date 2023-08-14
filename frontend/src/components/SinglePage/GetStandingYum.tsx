import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import JSConfetti from "js-confetti";
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

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: [
        "#fff5e4",
        "#ffe3e1",
        "#ffd1d1",
        "#ff9494",
        "#C9CE6C",
        "#6F9A44",
      ],
      confettiRadius: 5,
      confettiNumber: 400,
    });
  }, []);

  const handleShowCard = () => {
    setShowCard(true);

    setTimeout(() => {
      setShowButton(true);
    }, 5000);
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
            alt="yum image"
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
