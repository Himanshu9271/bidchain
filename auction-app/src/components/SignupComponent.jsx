import React from "react";
import banner from "../assets/banner.svg";
import bidchainLogo from "../assets/bidchainLogo.jpg";
import { useNavigate } from "react-router-dom";
function SignupComponent({onConnect}) {
  
  return (
    <div className="container">
      <div className="leftComponents">
        <img className="bidchainLogo" src={bidchainLogo} alt="not found" />
        <h1>Log in</h1>
        <button className="loginBtn" onClick={onConnect}>Metamask Login</button>
      </div>
      <div className="rightComponents">
        <img className="banner" src={banner} alt="banner" />
      </div>
    </div>
  );
}

export default SignupComponent;
