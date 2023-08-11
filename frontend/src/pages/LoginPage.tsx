import React from "react";
import logo from "../assets/gametitle.png";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import SocialKakao from "../components/LoginPage/SocialKakao";
import transition from "../transition";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/main");
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Title Logo" className="gamelogo" />
      <SocialKakao onSuccess={handleLoginSuccess} />{" "}
    </div>
  );
};

export default transition(LoginPage);
