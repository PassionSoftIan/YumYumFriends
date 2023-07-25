import React from "react";
import logo from "../assets/gametitle.png";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import SocialKakao from "../components/LoginPage/SocialKakao";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/main");
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Title Logo" className="gamelogo" />
      <SocialKakao onSuccess={handleLoginSuccess} /> {/* onSuccess 프로퍼티 전달 */}
    </div>
  );
};

export default LoginPage;
