import React from "react";
import logo from "../assets/gametitle.png";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import SocialKakao from "../components/LoginPage/SocialKakao";
import Boat from "../assets/Common/boat.png"
import { ZoomIn } from "./styles/transition";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/main");
  };

  return (
    <div className="backlogin">

        <img src={logo} alt="Title Logo" className="gamelogo" />
        <img src={Boat} alt="" className="boat"/>
        <div className="kbutton">
        <SocialKakao onSuccess={handleLoginSuccess} />{" "}
        </div>
    </div>
  );
};

export default LoginPage;
