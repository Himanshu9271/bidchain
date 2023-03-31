import React from "react";
import reactLogo from "../assets/react.svg";
import banner from "../assets/banner.svg";
import bidchainLogo from "../assets/bidchainLogo.jpg";
import { useNavigate } from "react-router-dom";
function SignupComponent() {
  let navigate = useNavigate();
  const submitBtn = () => {
    navigate("/auction");
  };
  return (
    <div className="container">
      <div className="leftComponents">
        <img className="bidchainLogo" src={bidchainLogo} alt="not found" />
        <form onSubmit={submitBtn} className="signupForm">
          <span className="signUp">Sign Up</span>
          <input type="text" placeholder="Username..." className="box" />
          <input type="password" className="box" placeholder="Password..." />
          <div className="submitBtn">
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="leftComponents">Already User? Login Instead</div>
      </div>
      <div className="rightComponents">
        <img className="banner" src={banner} alt="banner" />
      </div>
    </div>
  );
}

export default SignupComponent;
