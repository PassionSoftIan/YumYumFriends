import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import JSConfetti from "js-confetti";
import MessageModal from "../Common/MessageModal";

interface Yum {
  name: string | undefined;
  type: string | undefined;
}

interface Props {
  yum: Yum;
}

const GetStandingYum: React.FC<Props> = ({ yum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    navigate("/main");
  };

  return (
    <React.Fragment>
      <h3>안녕!</h3>
      <h3>반가워 친구야</h3>
      <img
        src={require(`../../assets/StandingYums/${yum.name}.gif`)}
        alt="yum image"
        onClick={openModal}
      />
      {isModalOpen && (
        <MessageModal
          message="냠냠 도감에도 가지맨이 생겼어요!"
          buttonMessage="좋아요"
          onConfirm={closeModal}
        />
      )}
      {isSecondModalOpen && (
        <MessageModal
          message={`참 잘했어요.\n다음에 또 만나요.\n안녕!`}
          buttonMessage="안녕!"
          onConfirm={closeSecondModal}
        />
      )}
    </React.Fragment>
  );
};

export default GetStandingYum;
