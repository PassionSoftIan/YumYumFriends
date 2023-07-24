import React from "react";
import logo from "../assets/gametitle.png";
import "./styles/LoginPage.css";
import SocialKakao from "../components/LoginPage/SocialKakao";

const LoginPage = () => {
  return (
    <div className="login-page">
      <img src={logo} alt="Title Logo" className="gamelogo" />
      <SocialKakao />
    </div>
  );
};

export default LoginPage;
