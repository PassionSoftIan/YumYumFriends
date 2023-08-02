import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/MainPage.css";

import MainAni from '../components/Animation/MainAni';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSinglePlayerGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("단일 플레이어 게임 시작");
    animateButton(e);
    setTimeout(() => {
      navigate("/single");
    }, 1000); // 1초 뒤에 페이지 전환 실행
  };

  const handleMultiPlayerGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("다중 플레이어 게임 시작");
    animateButton(e);
    setTimeout(() => {
      navigate("/multi");
    }, 1000); // 1초 뒤에 페이지 전환 실행
  };

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("프로필");
    animateButton(e);
    setTimeout(() => {
      navigate("/profile");
    }, 1000); // 1초 뒤에 페이지 전환 실행
  };

  const animateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const x = buttonRect.left + buttonRect.width / 2; // 버튼 중앙의 X 좌표
    const y = buttonRect.top; // 버튼의 상단에 해당하는 Y 좌표
    const particleType = e.currentTarget.dataset.type;

    for (let i = 0; i < 30; i++) {
      createParticle(x, y, particleType);
    }
  };

  const createParticle = (x: number, y: number, type?: string) => {
    const particle = document.createElement("div");
    document.body.appendChild(particle);

    const size = Math.floor(Math.random() * 20 + 5);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.position = "absolute";
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;

    switch (type) {
      case "square":
        particle.style.background = `hsl(${
          Math.random() * 90 + 270
        }, 70%, 60%)`;
        particle.style.border = "1px solid white";
        break;
      case "circle":
        particle.style.background = `hsl(${
          Math.random() * 90 + 180
        }, 70%, 60%)`;
        particle.style.borderRadius = "50%";
        break;
      default:
        particle.style.background = `hsl(${
          Math.random() * 90 + 180
        }, 70%, 60%)`;
    }

    const destinationX = (Math.random() - 0.5) * 2 * 75;
    const destinationY = (Math.random() - 0.5) * 2 * 75;

    particle.animate(
      [
        {
          transform: `translate(0, 0)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 500 + Math.random() * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: Math.random() * 200,
      }
    ).onfinish = () => {
      particle.remove();
    };
  };

  return (
    <div className="main-container">
      <div className="center">
        <div className="button-container">
          <MainAni />
          <button
            onClick={handleSinglePlayerGame}
            data-type="circle"
            className="game-button button-second btn"
          >
            <span>Single</span>
          </button>
          <button
            onClick={handleMultiPlayerGame}
            data-type="square"
            className="game-button button-second btn"
          >
            <span>Multi</span>
          </button>
          <button
            onClick={handleProfile}
            data-type="circle"
            className="game-button button-second btn"
          >
            <span>프로필</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
